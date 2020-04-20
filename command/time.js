var timeout = {
  time: 15000,
};

module.exports = {
  name: 'time',
  description: 'Changes timeout in seconds',
  execute(msg, args) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      timeout.time = args[0] * 1000;
      msg.reply('Timeout set to: ' + args[0] + ' seconds.');
    }
    else {
      msg.reply('You must be an admin to perform this command!');
    }
  },
  timeout: timeout
};