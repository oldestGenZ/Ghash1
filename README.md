# GreenHash: EcoSage MVP

This repository contains the front-end MVP for GreenHash, an interactive web application designed to guide users through a Web3 journey focused on environmental and social impact. The core of this MVP is **EcoSage**, an AI-powered mentor that evaluates user actions and provides wisdom and rewards.

This application is built with React, Tailwind CSS, and the Google Gemini API.

## Vision: Doing Good is Power

GreenHash is an ecosystem designed to transform community-driven value creation into real economic and environmental impact. It introduces **Proof of Care (POC)**, a novel mechanism where users' contributions to the ecosystem and the environment are verified and rewarded. This MVP is the first step towards realizing that vision.

## 🚀 Web App MVP Features

*   **🌱 Quest Board:** An interactive board with missions ranging from simple Web3 onboarding (`Connect your wallet`) to real-world, verifiable eco-actions (`Map erosion`).
*   **📸 Proof of Care Submission:** Users can submit proof for specific quests using their device's **camera and GPS**. This feature is crucial for verifying real-world actions.
*   **🤖 EcoSage AI Oracle:** The heart of the experience. Users submit their actions and proofs to EcoSage, a sophisticated AI persona built on the Gemini API. EcoSage:
    *   Evaluates submissions based on consistency, care, and credibility.
    *   Assigns a **Trust Score (0-100)**.
    *   Provides a wise "prophecy," actionable guidance, and sometimes, a witty quip.
    *   Unlocks special rewards and badges for exemplary actions.
*   **📊 User Progression Dashboard:** Tracks key stats like Experience Points (XP), `$HASH` token balance, and badges earned, providing a clear view of the user's journey and reputation within the ecosystem.
*   **💎 Dynamic Rewards:** Completing quests and receiving high scores from EcoSage automatically grants users XP, `$HASH`, and unique badges (simulated for the demo).

## 🤖 Companion Telegram Bot

Alongside the web app, this project includes a companion Telegram bot for quick, on-the-go interactions with the GreenHash ecosystem.

### Bot Features

*   `/start`: Welcomes the user to the bot.
*   `/mintbadge`: Simulates minting an Eco-Badge.
*   `/score`: Displays the user's current Care Score.

### ⚙️ How to Run the Bot (for Demo)

This bot uses a simple and reliable **polling** method to get messages from Telegram. This is the easiest way to run the bot for a demo and does **not** require `ngrok` or webhooks.

**Step 1: Install Dependencies**

If you haven't already, open the terminal and run:
```bash
npm install node-telegram-bot-api
```

**Step 2: Start the Bot**

In the terminal, run the following command:
```bash
node bot.js
```

You should see the message `Telegram bot is running...`. This means the bot is active and listening for your commands.

**Step 3: Interact on Telegram**

You can now talk to your bot on Telegram:
[**Open DIP_ATH_bot on Telegram**](https://t.me/DIP_ATH_bot)

Try sending it the commands `/start`, `/mintbadge`, and `/score`.

## ⚙️ Getting Started (Web App)

### Prerequisites

You need a valid Google Gemini API key to run this application.

### Configuration

The application expects the API key to be available as an environment variable named `API_KEY`. When running in a development environment like Google AI Studio, this variable should be configured in the environment's secret settings.

**No `.env` file is required for this setup.** The application code directly accesses `process.env.API_KEY`.

### Running the Application

This project is set up to run in a web-based development environment like Google AI Studio. Simply open the project, ensure your `API_KEY` is configured in the secrets, and the application will be served automatically.