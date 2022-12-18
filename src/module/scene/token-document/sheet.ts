import { TokenDocumentExitNihilo } from "./document";

export class TokenConfigExitNihilo<TDocument extends TokenDocumentExitNihilo> extends TokenConfig<TDocument> {
    override get template(): string {
        return "systems/exit-nihilo/templates/scene/token/sheet.html";
    }
}
