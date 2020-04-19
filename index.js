require('dotenv').config();
const ytdl = require('ytdl-core-discord');
const db = require('./db').db

const Discord = require('discord.js');
const client = new Discord.Client();

const COMMAND_PREFIX = '!';

client.commands = new Discord.Collection();
const commands = require('./command');

let TIMEOUT = 15 * 1000; // s to ms

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

async function streamAudio(voiceChannel, url) {
  var connection = await voiceChannel.join();
  setInterval(() => {
    connection.disconnect();
  }, TIMEOUT);
  const dispatcher = connection
    .play(await ytdl(url), { type: 'opus' })
    .on("finish", () => {

    })
    .on("error", error => console.error(error));
    dispatcher.setVolume(1);
};

client.on('voiceStateUpdate', (oldState, newState) => {
  let oldChannel = oldState.channel;
  let newChannel = newState.channel;

  if (oldChannel === null && newChannel !== null) { // join channel
    console.log('User unique id: ' + newState.member.id + ' connected to voice channel');
    const query = `SELECT url
                   FROM users
                   WHERE username = ?`;
    db.get(query, [newState.member.id], (err, row) => {
      if (err) console.error(err);
      else if (row) streamAudio(newChannel, row.url);
    });
  }
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);