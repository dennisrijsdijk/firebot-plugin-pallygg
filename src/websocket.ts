import { EventEmitter } from "node:events";
import { PallyCampaignTipNotify, PallyMessage } from "./pally";
import { triggerPallyDonation } from "./events";
import firebot from "@crowbartools/firebot-types";

class PallyWebsocket extends EventEmitter {
    private _ws?: WebSocket
    private _ping?: ReturnType<typeof setTimeout>;
    private _pong?: ReturnType<typeof setTimeout>;
    private _closeResolve?(): void;

    constructor() {
        super();
    }

    sendPing() {
        if (this._ws != null) {
            if (this._ws.readyState !== WebSocket.OPEN) {
                firebot.logger.warn("Attempted to send ping with invalid ready state", this._ws.readyState);
            } else {
                this._ws.send("ping");
            }
        }
        setTimeout(() => this.sendPing(), 6e4);
    }

    updatePong() {
        clearTimeout(this._pong);
        this._pong = setTimeout(() => {
            if (this._ws != null) {
                this._ws.close();
            }
        }, 9e4);
    }

    simulateDonation(slug: string, donationAmount: number, displayName: string, message: string) {
        if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
            firebot.logger.error("Error while simulating donation: websocket is not ready.");
            return;
        }

        const echoMessage = {
            type: "echo",
            payload: {
                type: "campaigntip.notify",
                payload: {
                    campaignTip: {
                        displayName,
                        grossAmountInCents: donationAmount * 100,
                        message
                    },
                    page: {
                        slug
                    }
                }
            }
        }

        this._ws.send(JSON.stringify(echoMessage));
    }

    cleanupWebsocket() {
        clearTimeout(this._ping);
        clearTimeout(this._pong);

        if (this._ws) {
            this._ws.onopen = null;
            this._ws.onmessage = null;
            this._ws.onerror = null;
            this._ws.onclose = null;
            this._ws = undefined;
        }
    }

    async connect(apiKey: string) {
        await this.disconnect();

        clearTimeout(this._ping);
        clearTimeout(this._pong);

        if (apiKey.trim() === "") {
            firebot.logger.error("Invalid apiKey entered");
            return;
        }

        firebot.logger.debug("Connecting to firehose websocket");

        this._ws = new WebSocket(`wss://events.pally.gg?auth=${apiKey}&channel=firehose`);

        this._ws.onopen = () => {
            firebot.logger.debug("Connected to firehose");
            this.updatePong();
            this.sendPing();
        };

        this._ws.onmessage = (event: MessageEvent<string>) => {
            this.updatePong();
            const message = event.data;
            if (message === "pong") {
                return;
            }

            const messageObject: PallyMessage = JSON.parse(message);

            if (messageObject.type === "campaigntip.notify") {
                const donation = messageObject as PallyCampaignTipNotify;
                triggerPallyDonation(
                    donation.payload.campaignTip.displayName,
                    donation.payload.campaignTip.grossAmountInCents / 100,
                    donation.payload.campaignTip.message,
                    donation.payload.page.slug
                );
            }
        };

        this._ws.onerror = async (event: Event) => {
            if ((event as ErrorEvent).error.message !== "Connection was closed before it was established.") {
                firebot.logger.error("Websocket error:", event);
                firebot.logger.error("Please ensure your API Key is configured correctly.");
                await this.disconnect();
            }
            this.cleanupWebsocket();
        };

        this._ws.onclose = async (event) => {
            const code = event.code;
            firebot.logger.debug(`Disconnected with code ${code}`);
            if (this._closeResolve) {
                this._closeResolve();
                this._closeResolve = undefined;
            }

            this.cleanupWebsocket();

            if (code !== 4000) {
                await new Promise(resolve => setTimeout(resolve, 5e3));
                this.connect(apiKey);
            }
        }
    }

    disconnect(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this._ws != null && this._ws.readyState < WebSocket.CLOSING) {
                firebot.logger.debug("Disconnecting from firehose websocket");
                this._closeResolve = resolve;
                this._ws.close(4000);
            } else {
                resolve();
            }
        });
    }
}

export default new PallyWebsocket();