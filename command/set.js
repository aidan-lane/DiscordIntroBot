module.exports = {
  name: 'set',
  description: 'Sets an intro sound!',
  execute(msg, args) {
    console.log(args)
    msg.reply('it worked');
  },
};