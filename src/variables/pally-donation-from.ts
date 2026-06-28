import type { ReplaceVariable } from "@crowbartools/firebot-types";
import { PallyDonationEventData } from "../pally";

const triggers = {
    event: ["dennisontheinternet:pally:donation"],
    manual: true
}

const model: ReplaceVariable = {
    definition: {
        handle: "pallyDonationFrom",
        description: "The username of the donator. 'Someone' when no name is entered.",
        triggers: triggers,
        possibleDataOutput: [ "text" ]
    },
    evaluator(trigger) {
        const username = (trigger.metadata.eventData as PallyDonationEventData).username;
        return username === "" ? "Someone" : username;
    }
}

export default model;