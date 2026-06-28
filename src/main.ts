import firebot, { Plugin } from "@crowbartools/firebot-types";

import { eventSource } from "./events";
import websocket from "./websocket";
import variables from "./variables";

type Params = {
  apiKey: string;
}

const plugin: Plugin<Params> = {
  manifest: {
    name: "Pally.gg",
    version: "1.1.0",
    author: "DennisOnTheInternet",
    description: "Pally.gg Donation events for Firebot",
    tags: [
      "donation",
      "donations",
      "tip",
      "tips",
      "events",
      "alerts"
    ],
    repo: "https://github.com/dennisrijsdijk/firebot-plugin-pallygg",
    minimumFirebotVersion: {
      major: 5,
      minor: 67,
      patch: 0
    },
    icon: {
      type: "font-awesome",
      name: "fa-hand-holding-usd"
    }
  },
  parametersSchema: [
    {
      name: "apiKey",
      type: "password",
      title: "Pally.gg API Key",
      description: "Your Pally.gg account's API Key.",
      tip: "You can [Generate an API Key](https://pally.gg/dashboard/settings/api-keys) on Pally's website",
      validation: {
        required: true,
        pattern: ".+"
      },
      default: ""
    }
  ],
  registers: {
    eventSources: [
      eventSource
    ],
    variables
  },
  async onParameterUpdate(ctx) {
    await websocket.connect(ctx.parameters.apiKey);
  },
  onLoad(ctx) {
    websocket.connect(ctx.parameters.apiKey);
  },
  async onUnload() {
    await websocket.disconnect();
  }
}

export default plugin;