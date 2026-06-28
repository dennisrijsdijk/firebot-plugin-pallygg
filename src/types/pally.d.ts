type PallyMessageType = "campaigntip.notify";

type PallyMessage = {
    type: PallyMessageType;
    payload: {
        page: {
            id: string;
            slug: string;
            title: string;
            url: string;
        }
    }
};

type PallyCampaignTipEventData = {
    createdAt: string;
    displayName: string;
    grossAmountInCents: number;
    netAmountInCents: number;
    processingFeeInCents: number;
    id: string;
    message: string;
    updatedAt: string;
};

type PallyDonationEventData = FirebotDonationMetadata & {
    pageSlug: string;
}

type PallyCampaignTipNotify = {
    type: "campaigntip.notify";
    payload: {
        campaignTip: PallyCampaignTipEventData;
    } & PallyMessage["payload"];
};