import type { ReplaceVariable } from "@crowbartools/firebot-types";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationMessage",
        hidden: true,
        description: "The message sent with a donation on pally.gg",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger) {
        return (trigger.metadata.eventData as PallyDonationEventData).donationMessage ?? "";
    }
}

export default model;