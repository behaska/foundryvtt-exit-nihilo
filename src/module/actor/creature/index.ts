import { ActorExitNihilo } from "@actor/base";

abstract class CreatureExitNihilo extends ActorExitNihilo {
        /** Prepare token data derived from this actor, refresh Effects Panel */
        override prepareData(): void {
            super.prepareData();
        }
    
        /** Prepare baseline ephemeral data applicable to all actor types */
        override prepareBaseData(): void {
            super.prepareBaseData();
        }
    
        override prepareDerivedData(): void {
            super.prepareDerivedData();
        }

        /** Prepare the physical-item collection on this actor, item-sibling data, and rule elements */
        override prepareEmbeddedDocuments(): void {
            super.prepareEmbeddedDocuments();
        }
}

export { CreatureExitNihilo };