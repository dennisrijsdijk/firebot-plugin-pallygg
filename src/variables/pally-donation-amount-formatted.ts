import type { ReplaceVariable } from "@crowbartools/firebot-types";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationAmountFormatted",
        hidden: true,
        description: "The donation amount as a formatted string, eg. '$10.00'",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger) {
        return (trigger.metadata.eventData as PallyDonationEventData).formattedDonationAmount;
    }
}

export default model;