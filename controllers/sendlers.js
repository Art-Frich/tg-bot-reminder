const schedule = require('node-schedule');
const { sendReminders } = require('./userController');

module.exports.connectSendlerReminders = (bot) => {
  const handleSendReminders = () => sendReminders(bot);
  const rule = new schedule.RecurrenceRule();
  rule.tz = 'Etc/UTC';
  rule.minute = 0;

  const j1 = schedule.scheduleJob({ ...rule, hour: 4 }, handleSendReminders);
  const j2 = schedule.scheduleJob({ ...rule, hour: 8 }, handleSendReminders);
  const j3 = schedule.scheduleJob({ ...rule, hour: 14 }, handleSendReminders);
};
