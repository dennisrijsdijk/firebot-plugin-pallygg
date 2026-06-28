import { PluginAdditionalVariableEvents } from "@crowbartools/firebot-types";
import pallyDonationAmount from "./pally-donation-amount";
import pallyDonationAmountFormatted from "./pally-donation-amount-formatted";
import pallyDonationFrom from "./pally-donation-from";
import pallyDonationMessage from "./pally-donation-message";
import pallyDonationPageSlug from "./pally-donation-page-slug";

export const variables = [
    pallyDonationAmount,
    pallyDonationAmountFormatted,
    pallyDonationFrom,
    pallyDonationMessage,
    pallyDonationPageSlug
];

const events: PluginAdditionalVariableEvents["events"] = [ { eventSourceId: "dennisontheinternet:pally", eventId: "donation" } ];

export const additionalVariableEvents: PluginAdditionalVariableEvents[] = [
    { handle: "donationFrom", events },
    { handle: "donationMessage", events },
    { handle: "donationAmount", events },
    { handle: "donationAmountFormatted", events }
];