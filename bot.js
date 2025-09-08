const TelegramBot = require('node-telegram-bot-api');
const token = '8156307820:AAE8Zo3YqZPApMFwdkWoloegQXuzGvHGu90';
const bot = new TelegramBot(token, { polling: true });

// Simple in-memory storage for user scores
const careScores = {};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello! DIP_ATH_bot is live 🚀\n\nTry these commands:\n/mintbadge - Get a badge and +1 score\n/startquest - Play the Eco Quest mini-game\n/score - Check your total Care Score');
});

bot.onText(/\/mintbadge/, (msg) => {
  const chatId = msg.chat.id;
  // Initialize score if it's the user's first time
  if (careScores[chatId] === undefined) {
    careScores[chatId] = 0;
  }
  // Increment the user's score
  careScores[chatId]++;
  const newScore = careScores[chatId];
  bot.sendMessage(msg.chat.id, `🌱 Eco-Badge Minted!\nYour Care Score is now: ${newScore}`);
});

bot.onText(/\/score/, (msg) => {
  const chatId = msg.chat.id;
  // Retrieve the score, defaulting to 0 if the user has no score yet
  const score = careScores[chatId] || 0;
  bot.sendMessage(msg.chat.id, `Your Care Score is: ${score}/100 💚`);
});

// --- Eco Quest Mini-Game ---

bot.onText(/\/startquest/, (msg) => {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🌳 Plant Tree (+1)', callback_data: 'tree' }],
        [{ text: '🏞 Clean River (+2)', callback_data: 'river' }],
        [{ text: '🛠 Build Tool (+3)', callback_data: 'tool' }]
      ]
    }
  };
  bot.sendMessage(msg.chat.id, 'Choose your eco-action to earn Care Score:', opts);
});

bot.on('callback_query', (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  
  // Initialize score if it's the user's first time
  if (careScores[chatId] === undefined) {
    careScores[chatId] = 0;
  }

  let scoreGained = 0;
  let responseText = '';

  if (action === 'tree') {
    scoreGained = 1;
    responseText = '🌳 You planted a tree!';
  } else if (action === 'river') {
    scoreGained = 2;
    responseText = '🏞 You cleaned a river!';
  } else if (action === 'tool') {
    scoreGained = 3;
    responseText = '🛠 You built a tool!';
  }

  if (scoreGained > 0) {
    careScores[chatId] += scoreGained;
    const totalScore = careScores[chatId];
    // Acknowledge the button press to remove the loading state on the client
    bot.answerCallbackQuery(callbackQuery.id);
    // Send a message with the update
    bot.sendMessage(chatId, `${responseText}\n+${scoreGained} Care Score.\nYour new total is ${totalScore}.`);
  }
});

console.log('Telegram bot is running...');