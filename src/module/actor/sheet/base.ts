import { ActorExitNihilo } from "@actor/base";
import { ActorDataExitNihilo } from "@actor/data";
import { ItemExitNihilo } from "@item/base";
import { ActorSheetDataExitNihilo } from "./data-types";

/**
 * Extend the basic ActorSheet class to do all the ExitNihilo things!
 * This sheet is an Abstract layer which is not used.
 * @category Actor
 */
abstract class ActorSheetExitNihilo<TActor extends ActorExitNihilo> extends ActorSheet<TActor, ItemExitNihilo> {
    static override get defaultOptions(): ActorSheetOptions {
        const options = super.defaultOptions;
        options.dragDrop.push({ dragSelector: ".drag-handle" }, { dragSelector: ".item[draggable=true]" });
        return mergeObject(options, {
            classes: ["default", "sheet", "actor"],
            scrollY: [".sheet-sidebar", ".tab.active", ".inventory-list"],
        });
    }

    override async getData(options: ActorSheetOptions = this.options): Promise<ActorSheetDataExitNihilo<TActor>> {
        // The Actor and its Items
        const actorData = this.actor.toObject(false) as RawObject<ActorDataExitNihilo>;

        const sheetData: ActorSheetDataExitNihilo<TActor> = {
            cssClass: this.actor.isOwner ? "editable" : "locked",
            editable: this.isEditable,
            document: this.actor,
            limited: this.actor.limited,
            options,
            owner: this.actor.isOwner,
            title: this.title,
            actor: actorData,
            data: actorData.system,
            effects: [],
            items: actorData.items,
            user: { isGM: game.user.isGM },
            enrichedContent: {},
        };

        return sheetData;
    }
}

interface ActorSheetExitNihilo<TActor extends ActorExitNihilo> extends ActorSheet<TActor, ItemExitNihilo> {
    prepareItems?(sheetData: ActorSheetDataExitNihilo<TActor>): Promise<void>;
}

export { ActorSheetExitNihilo };
