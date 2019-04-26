const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const DB = "./db.json";

var db;
// Initialize database, if already exists, load it!
if (!fs.existsSync(DB)) {
  console.log("Creating new database");
  const adaper = new FileSync(DB);
  const db = low(adaper)
  db.defaults({ user_login: [], user_data: [] }).write();
} else {
  const adaper = new FileSync(DB);
  const db = low(adaper);
  console.log("Reading from existing database");
}


module.exports = db;
