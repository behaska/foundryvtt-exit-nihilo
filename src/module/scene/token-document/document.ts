import { ActorExitNihilo } from "@actor/base";
import { PrototypeTokenExitNihilo } from "@actor/data/base";
import { ChatMessageExitNihilo } from "@module/chat-message/document";

class TokenDocumentExitNihilo<TActor extends ActorExitNihilo = ActorExitNihilo> extends TokenDocument<TActor> {
    /** Has this token gone through at least one cycle of data preparation? */
    private initialized?: boolean;

    /** Filter trackable attributes for relevance and avoidance of circular references */
    static override getTrackedAttributes(data: Record<string, unknown> = {}, _path: string[] = []): TokenAttributes {
        // This method is being called with no associated actor: fill from the models
        if (_path.length === 0 && Object.keys(data).length === 0) {
            for (const [type, model] of Object.entries(game.system.model.Actor)) {
                if (!["character", "npc"].includes(type)) continue;
                foundry.utils.mergeObject(data, model);
            }
        }

        if (_path.length > 0) {
            return super.getTrackedAttributes(data, _path);
        }

        const patterns = {
            positive: /^(?:attributes|resources)\./,
            negative: /\b(?:rank|_?modifiers|item|classdc|dexcap|familiar|\w+hp\b)|bonus/i,
        };

        const prunedData = expandObject<Record<string, unknown>>(
            Object.fromEntries(
                Object.entries(flattenObject(data)).filter(
                    ([k, v]) =>
                        patterns.positive.test(k) &&
                        !patterns.negative.test(k) &&
                        !["boolean", "string"].includes(typeof v)
                )
            )
        );

        return super.getTrackedAttributes(prunedData, _path);
    }

    /** This should be in Foundry core, but ... */
    get scene(): this["parent"] {
        return this.parent;
    }

    protected override _initialize(): void {
        super._initialize();
        this.initialized = true;
    }

    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean {
        return this.data.brightLight < 0;
    }

    /** The pixel-coordinate definition of this token's space */
    get bounds(): PIXI.Rectangle {
        const gridSize = this.scene?.grid.size ?? 100;
        // Use source values since coordinates are changed in real time over the course of movement animation
        return new PIXI.Rectangle(this._source.x, this._source.y, this.width * gridSize, this.height * gridSize);
    }

    /** The pixel-coordinate pair constituting this token's center */
    get center(): Point {
        const { bounds } = this;
        return {
            x: bounds.x + bounds.width / 2,
            y: bounds.y + bounds.height / 2,
        };
    }

    /** If rules-based vision is enabled, disable manually configured vision radii */
    override prepareBaseData(): void {
        super.prepareBaseData();

        if (!this.actor || !this.isEmbedded) return;

        // Synchronize the token image with the actor image, if the token does not currently have an image

        if (!this.initialized) return;

        // Dimensions and scale

        // Autoscaling is a secondary feature of linking to actor size
    }

    /** Reset sight defaults if using rules-based vision */
    protected override _prepareDetectionModes(): void {
        if (!(this.initialized && this.actor)) {
            return super._prepareDetectionModes();
        }

        this.detectionModes = [{ id: "basicSight", enabled: true, range: null }];
        if (["character", "familiar"].includes(this.actor.type)) {
            this.sight.attenuation = 0.1;
            this.sight.brightness = 0;
            this.sight.contrast = 0;
            this.sight.range = null;
            this.sight.saturation = 0;
            this.sight.visionMode = "basic";
        }
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
        if (!(this.initialized && this.actor && this.scene)) return;

        // Merge token overrides from REs into this document


        // Token dimensions from actor size
        TokenDocumentExitNihilo.prepareSize(this, this.actor);
    }

    /** Set a TokenData instance's dimensions from actor data. Static so actors can use for their prototypes */
    static prepareSize(token: TokenDocumentExitNihilo | PrototypeTokenExitNihilo, actor: ActorExitNihilo | null): void {
        if (!(actor && token.flags.exitihilo.linkToActorSize)) return;
            
    }

    /** Set a token's initiative on the current encounter, creating a combatant if necessary */
    async setInitiative({
        initiative,
        sendMessage = true,
    }: {
        initiative: number;
        sendMessage?: boolean;
    }): Promise<void> {
        if (!game.combat) {
            ui.notifications.error("EXITNIHILO.Encounter.NoActiveEncounter");
            return;
        }

        const currentId = game.combat.combatant?.id;
        if (this.combatant && game.combat.combatants.has(this.combatant.id)) {
            await game.combat.setInitiative(this.combatant.id, initiative);
        } else {
            await game.combat.createEmbeddedDocuments("Combatant", [
                {
                    tokenId: this.id,
                    initiative,
                },
            ]);
        }
        // Ensure the current turn is preserved
        await this.update({ turn: game.combat.turns.findIndex((c) => c.id === currentId) });

        if (sendMessage) {
            await ChatMessageExitNihilo.createDocuments([
                {
                    speaker: { scene: this.scene?.id, token: this.id },
                    whisper: this.actor?.hasPlayerOwner
                        ? []
                        : game.users.contents.flatMap((user) => (user.isGM ? user.id : [])),
                    content: game.i18n.format("EXITNIHILO.InitativeIsNow", { name: this.name, value: initiative }),
                },
            ]);
        }
    }

    /* -------------------------------------------- */
    /*  Event Handlers                              */
    /* -------------------------------------------- */

    protected override _onUpdate(
        changed: DeepPartial<this["_source"]>,
        options: DocumentModificationContext,
        userId: string
    ): void {
        // Possibly re-render encounter tracker if token's `displayName` property has changed
        const tokenSetsNameVisibility = game.settings.get("exit-nihilo", "metagame_tokenSetsNameVisibility");
        if ("displayName" in changed && tokenSetsNameVisibility && this.combatant) {
            ui.combat.render();
        }

        // Workaround for actor-data preparation issue: release token if this is made unlinked while controlled
        if (changed.actorLink === false && this.rendered && this.object.controlled) {
            this.object.release();
        }

        // Handle ephemeral changes from synthetic actor
        if (!this.actorLink && this.parent && changed.actorData) {
            // If the Actor data override changed, simulate updating the synthetic Actor
            this._onUpdateTokenActor(changed.actorData, options, userId);
            this.reset();

            // Fake some updates to trigger redraw
            delete changed.actorData; // Prevent upstream from doing so a second time
        }

        return super._onUpdate(changed, options, userId);
    }

    /** Reinitialize vision if the actor's senses were updated directly */
    override _onUpdateBaseActor(update?: Record<string, unknown>, options?: DocumentModificationContext<Actor>): void {
        super._onUpdateBaseActor(update, options);
        if (!this.isLinked) return;

        if (Object.keys(flattenObject(update ?? {})).some((k) => k.startsWith("system.traits.senses"))) {
            this.reset();
        }
    }

    /** Re-render token placeable if REs have ephemerally changed any visuals of this token */
    onActorEmbeddedItemChange(): void {
        if (!(this.isLinked && this.rendered && this.object.visible)) return;

        this.object.drawEffects().then(() => {
            const preUpdate = this.toObject(false);
            const postUpdate = this.toObject(false);
            const changes = diffObject<DeepPartial<this["_source"]>>(preUpdate, postUpdate);

            // Assess the full diff using `diffObject`: additions, removals, and changes
            if (Object.keys(changes).length > 0) {
                this._onUpdate(changes, {}, game.user.id);
            }

            // Update combat tracker with changed effects
            if (this.combatant?.parent.active) ui.combat.render();
        });
        this.object.drawBars();
    }
}

interface TokenDocumentExitNihilo<TActor extends ActorExitNihilo = ActorExitNihilo> extends TokenDocument<TActor> {
}

export { TokenDocumentExitNihilo };
