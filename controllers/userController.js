const User = require('../models/userModel');

module.exports.trySubscribe = async (ctx) => {
  try {
    const user = await User.create({ tgId: ctx.from.id });
    ctx.reply(
      'Отлично! В течение 20 дней я буду напоминать о том, что пора выпить витамины в 9.00, 13.00 и 19.00. Если хочешь изменить время, свяжись с @Frich22'
    );
  } catch (error) {
    if (error.code === 11000) {
      ctx.reply('Вы уже подписаны!');
    } else {
      console.error(error);
      ctx.reply('Произошла ошибка при попытке подписаться.');
    }
  }
};

module.exports.tryUnsubscribe = async (ctx) => {
  try {
    const user = await User.findOneAndDelete({ tgId: ctx.from.id });

    if (user) {
      // Действия для отписки (если необходимо)
      ctx.reply('Ладно, я больше не буду...');
    } else {
      ctx.reply('А ты подпишись сначала, чтоб я отписать тебя мог...');
    }
  } catch (error) {
    ctx.reply('Произошла ошибка при попытке отписки.');
  }
};

module.exports.sendReminders = async (bot) => {
  try {
    const users = await User.find();
    const message = 'Напоминание: пора пить витамины!';

    users.forEach((user) => {
      bot.telegram.sendMessage(user.tgId, message);
    });
  } catch (error) {
    console.error('Произошла ошибка при отправке напоминаний:', error);
  }
};
