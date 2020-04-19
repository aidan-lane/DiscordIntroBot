const sqlite3 = require('sqlite3').verbose();

let db = null
if (db === null) {
  db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to database.');
  })
}

module.exports = {
  db: db
};