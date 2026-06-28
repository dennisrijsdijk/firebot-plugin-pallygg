import firebot, { EventSource } from "@crowbartools/firebot-types";
import { PallyDonationEventData } from "./pally";

export const eventSource: EventSource = {
    id: "dennisontheinternet:pally",
    name: "Pally.gg",
    description: "Donation events for pally.gg",
    events: [
        {
            id: "donation",
            name: "Donation",
            description: "When a donation is sent through pally.gg",
            manualMetadata: {
                username: "Firebot",
                donation: 5.10
            },
            activityFeed: {
                icon: "fad fa-hand-holding-usd",
                getMessage: (data: unknown) => {
                    const eventData = data as PallyDonationEventData;
                    const username: string = eventData.username === "" ? "Someone" : eventData.username;
                    return `**${username}** donated **$${eventData.donation.toFixed(2)}** to page **${eventData.pageSlug}**`
                }
            }
        }
    ]
}

export function triggerPallyDonation(username: string, donation: number, message: string, pageSlug: string) {
    firebot.events.trigger(eventSource.id, "donation", {
        username,
        donation,
        message,
        pageSlug
    });
}