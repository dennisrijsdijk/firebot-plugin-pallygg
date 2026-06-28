import type { ReplaceVariable } from "@crowbartools/firebot-types";
import { PallyDonationEventData } from "../pally";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationAmountFormatted",
        description: "The donation amount as a formatted string, eg. '$10.00'",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger) {
        return `$${((trigger.metadata.eventData as PallyDonationEventData).donation ?? 0).toFixed(2)}`;
    }
}

export default model;