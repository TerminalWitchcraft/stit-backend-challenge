const fs = require("fs");
const express = require("express");
const cors = require("cors");
const shortid = require("shortid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const DB = "./db.json";
const adaper = new FileSync(DB);
const db = low(adaper);

// Initialize database, if already exists, load it!
if (!fs.existsSync(DB)) {
  db.defaults({ user_login: [], user_data: [] }).write();
  console.log("Creating new database")
} else {
  console.log("Reading from existing database")
}

const port = 8000;
const app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

// Run the server
app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
