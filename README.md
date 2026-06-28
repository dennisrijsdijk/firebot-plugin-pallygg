# Firebot Pally

## Installation

Before continuing, generate an API key on [Pally's Website](https://pally.gg/dashboard/settings/api-keys)

Download `firebot-pally.js` from the [latest release](https://github.com/dennisrijsdijk/firebot-script-pallygg/releases/latest)

In Firebot, go to Tools > Plugin Manager. If plugins are disabled, click the "Enable" button.

Click "Install Plugin" and find the `firebot-pally.js` file downloaded earlier.

Paste your API key in the field and press "Install"

## Activity Feed

To see donations in the activity feed, go back to the main Dashboard page.

Click on the three dots in the activity feed, then on "Edit events"

Find "Donation (Pally.gg)", enable it and press save.

## Usage

The Pally script provides a Donation event, as well as a few variables:
- $donationAmount - Donation amount as a number (e.g. 10.5)
- $donationAmountFormatted - Donation amount formatted as a string (e.g. $10.50)
- $donationFrom - The donator's name, entered on the donation page. 'Someone' when no name is entered
- $donationMessage - The message left by the donator
- $pallyDonationPageSlug - The slug (URL segment) for the page where the donation took place. e.g. for https://pally.gg/p/dennis, the slug is "dennis"

Using the event and these variables, you can set up simple, or complex donation alerts.

Using the page slug you can differentiate between different pages you own using a conditional effect.

## Legacy Variables

In addition to the above variables, the plugin includes legacy variables which were used in the old script. These will stay in the plugin for compatibility reasons, but the above should be used if possible.

- $pallyDonationAmount - Same as $donationAmount
- $pallyDonationAmountFormatted - Same as $donationAmountFormatted
- $pallyDonationFrom - Same as $donationFrom
- $pallyDonationMessage - Same as $donationMessage

## Development

### Setup
1. Create a new repo based off this template (Click "Use this Template" above) or simply fork it
2. `npm install`

### Building
Dev:
1. `npm run build:dev`
- Automatically copies the compiled .js to Firebot's scripts folder and attempts to reload the plugin in Firebot

Additionally, when building in dev, the "Pally.gg Websocket Simulation" effect becomes available which can be used to simulate donations from the websocket

Release:
1. `npm run build`
2. Copy .js from `/dist`