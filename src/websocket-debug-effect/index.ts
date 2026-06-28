import firebot, { EffectType } from "@crowbartools/firebot-types";
import optionsTemplate from "./template.html";
import websocket from "../websocket";

type EffectModel = {
    pageSlug: string;
    username?: string;
    message?: string;
    donationAmount: string | number;
};

const effect: EffectType<EffectModel> = {
    definition: {
        id: "dennisontheinternet:pally:simulate",
        hidden: HIDE_DEBUG_EFFECT,
        name: "Pally.gg Websocket Simulation",
        description: "A debug effect to simulate a pally.gg donation on the websocket level.",
        icon: "fad fa-flask",
        categories: ["scripting"],
    },
    optionsTemplate,
    optionsController: ( ) => { },
    optionsValidator: (effect) => {
        const errors: string[] = [];
        if (!effect.pageSlug || effect.pageSlug.trim() === "") {
            errors.push("Please enter a page slug");
        }

        if (!effect.donationAmount || typeof effect.donationAmount === "string" && effect.donationAmount.trim() === "") {
            errors.push("Please enter a donation amount");
        }

        return errors;
    },
    onTriggerEvent: async (event) => {
        const pageSlug = event.effect.pageSlug || "firebot";
        const username = event.effect.username ?? "";
        const message = event.effect.message ?? "";
        let donationAmount = typeof event.effect.message === "string" ? Number(event.effect.donationAmount) : event.effect.donationAmount as number;
        if (donationAmount == null || isNaN(donationAmount) || donationAmount <= 0) {
            donationAmount = +((Math.random() * 50).toFixed());
        }

        websocket.simulateDonation(pageSlug, donationAmount, username, message);
    },
};

export default effect;

