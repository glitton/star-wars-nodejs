// require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const quotesDb = require("./models/Quotes");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

//mongodb
const url = "mongodb://127.0.0.1:27017";
const dbName = "star-wars";
let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
});

db = client.db(dbName);
console.log(`Connected MongoDB: ${url}`);
console.log(`Database: ${dbName}`);

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

// routes
app.get("/", (req, res) => {
  res.sendFile(
    "/Users/nrloaner/Documents/CodingProjects/StarWarsQuotes" + "/index.html"
  );
});

app.post("/quotes", (req, res) => {
  console.log(req.body);
});

//listen
app.listen(3000, () => {
  console.log("listening on port 3000");
});
