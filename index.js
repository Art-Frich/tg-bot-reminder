const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const mongoose = require('mongoose');
const { mongooseOptions } = require('./helpers/constants');
const {
  tryUnsubscribe,
  trySubscribe,
} = require('./controllers/userController');
const { handleStart, handleAllMessage } = require('./controllers/handlers');
const { connectSendlerReminders } = require('./controllers/sendlers');
require('dotenv').config();

const { MONGO_URI, BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);
mongoose.connect(MONGO_URI, mongooseOptions);

bot.start((ctx) => handleStart(ctx));
bot.command('subscribe', (ctx) => trySubscribe(ctx));
bot.command('unsubscribe', (ctx) => tryUnsubscribe(ctx));
bot.on(message(), (ctx) => handleAllMessage(ctx));
bot.launch();
connectSendlerReminders(bot);

process.once('SIGINT', () => bot.stop('SIGINT')); // ctrl + c
process.once('SIGTERM', () => bot.stop('SIGTERM')); // kill
