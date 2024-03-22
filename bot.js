const Telegram = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');

const botToken = "Telegram Bot Key";
const openaiToken = "Open AI Api Key";

const config = new Configuration({
    apiKey: openaiToken,
});

const openai = new OpenAIApi(config);

const Bot = new Telegram(botToken, { polling: true });

Bot.onText(/\/start/, (msg) => {
    Bot.sendMessage(msg.chat.id, "Welcome to AI ChatBot");
});

Bot.on("message", async(msg) => {
    const chatId = msg.chat.id;

    const reply = await openai.createCompletion({
        max_tokens: 100, // corrected typo in max_tokens
        model: "ada",
        prompt: msg.text,
        temperature: 0.5, // corrected typo in temperature
    });

    Bot.sendMessage(chatId, reply.data.choices[0].text);
});