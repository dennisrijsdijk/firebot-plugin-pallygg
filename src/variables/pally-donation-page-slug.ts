import type { ReplaceVariable } from "@crowbartools/firebot-types";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationPageSlug",
        description: "The slug of the page this donation was sent to",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger) {
        return (trigger.metadata.eventData as PallyDonationEventData).pageSlug ?? "";
    }
}

export default model;