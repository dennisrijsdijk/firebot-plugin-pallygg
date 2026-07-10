import firebot, { EventSource, PluginAdditionalFilterEvents } from "@crowbartools/firebot-types";

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
                from: "Firebot",
                donationAmount: 5.10
            },
            activityFeed: {
                icon: "fad fa-hand-holding-usd",
                getMessage: (data: unknown) => {
                    const eventData = data as PallyDonationEventData;
                    return `**${eventData.from || "Someone"}** donated **${eventData.formattedDonationAmount}** to page **${eventData.pageSlug}**`
                }
            }
        }
    ]
}

export function triggerPallyDonation(username: string, donation: number, message: string, pageSlug: string) {
    const metadata: PallyDonationEventData = {
        donationAmount: donation,
        donationMessage: message,
        formattedDonationAmount: `$${donation.toFixed(2)}`,
        from: username,
        pageSlug
    }
    
    firebot.events.trigger(eventSource.id, "donation", metadata);
}

export const additionalFilterEvents: PluginAdditionalFilterEvents[] = [
    {
        filterId: "firebot:donation-amount",
        events: [ { eventSourceId: "dennisontheinternet:pally", eventId: "donation" } ]
    },
    {
        filterId: "firebot:donationfrom",
        events: [ { eventSourceId: "dennisontheinternet:pally", eventId: "donation" } ]
    }
];