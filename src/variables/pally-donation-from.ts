import type { ReplaceVariable } from "@crowbartools/firebot-types";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationFrom",
        hidden: true,
        description: "The username of the donator. 'Someone' when no name is entered.",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger) {
        return (trigger.metadata.eventData as PallyDonationEventData).from || "Someone";
    }
}

export default model;