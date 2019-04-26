const glob = require("glob");
const winston = require("winston");
const expressWinston = require("express-winston");
const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");

const port = 8000;
const app = express();

app.use(cors());
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ],
    meta: true,
    msg: "{{req.ip}}",
    requestWhitelist: ["method", "url"],
    bodyWhitelist: []
  })
);
app.use(body_parser.json());

const authMiddleWare = require("./middlewares/auth.middleware");
const openRouter = express.Router();
const secureRouter = express.Router();
secureRouter.use(authMiddleWare);
app.get("/", (req, res) => res.status(200).json({ msg: "Hello World" }));
glob("./routes/*.route.js", null, (err, files) => {
  files.map(path => {
    require(path)(openRouter, secureRouter);
  });
});

// Run the server
app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
