import { eventSource } from "./events";
import { Plugin } from "@crowbartools/firebot-types";
import simulateEffect from "./websocket-debug-effect";
import { additionalVariableEvents, variables } from "./variables";
import websocket from "./websocket";
import pallyLogo from "./pally_logo.svg";

type Params = {
  apiKey: string;
}

const plugin: Plugin<Params> = {
  manifest: {
    name: "Pally.gg",
    version: PLUGIN_VERSION,
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
      type: "custom",
      url: `data:image/svg+xml;base64,${pallyLogo}`
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
    additionalVariableEvents,
    effects: [
      simulateEffect
    ],
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