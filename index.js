require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const COMMAND_PREFIX = '!';

client.commands = new Discord.Collection();
const commands = require('./command');

Object.keys(commands).map(key => {
  client.commands.set(commands[key].name, commands[key]);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const args = msg.content.split(/ +/);
  let cmd = args.shift().toLowerCase();
  if (cmd.charAt(0) != COMMAND_PREFIX) return;
  cmd = cmd.substring(1); // remove prefix from cmd key

  if (!client.commands.has(cmd)) return;

  try {
    client.commands.get(cmd).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('There was an error executing this command');
  }
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);