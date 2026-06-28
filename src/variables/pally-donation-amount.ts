import type { ReplaceVariable } from "@crowbartools/firebot-types";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationAmount",
        hidden: true,
        description: "The donation amount as a raw number, eg. 10.2",
        triggers: triggers,
        possibleDataOutput: [ "number" ]
    },
    evaluator(trigger) {
        return (trigger.metadata.eventData as PallyDonationEventData).donationAmount ?? 0;
    }
}

export default model;