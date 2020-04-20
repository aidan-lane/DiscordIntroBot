const db = require('../db').db;
module.exports = {
  name: 'set',
  description: 'Sets an intro sound!',
  execute(msg, args) {
    let username = msg.member.id;
    let query = `REPLACE INTO users(username, url)
                 VALUES(?, ?)`;
    db.serialize(() => {
      db.get(query, [username, args[0]], (err, row) => {
        if (err) console.error(err);
        else msg.reply('Intro set!');
      });
    });
  },
};