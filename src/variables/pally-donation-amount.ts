import type { ReplaceVariable } from "@crowbartools/firebot-types";
import { PallyDonationEventData } from "../pally";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationAmount",
        description: "The donation amount as a raw number, eg. 10.2",
        triggers: triggers,
        possibleDataOutput: [ "number" ]
    },
    evaluator(trigger) {
        return (trigger.metadata.eventData as PallyDonationEventData).donation ?? 0;
    }
}

export default model;