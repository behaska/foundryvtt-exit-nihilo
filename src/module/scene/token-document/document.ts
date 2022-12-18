import { ActorExitNihilo } from "@actor/base";
import { TokenDataExitNihilo } from "./data";

class TokenDocumentExitNihilo<TActor extends ActorExitNihilo = ActorExitNihilo> extends TokenDocument<TActor> {
    /** If rules-based vision is enabled, disable manually configured vision radii */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
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
    readonly data: TokenDataExitNihilo<this>;
}

export { TokenDocumentExitNihilo };
