// require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
// const quotesDb = require("./models/Quotes");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

//mongodb
// const url = "mongodb://127.0.0.1:27017";
// const dbName = "star-wars";
// let db;

const connectionString =
  "mongodb+srv://glcodeworks:j@vA$c8!p7@cluster0-nzp7z.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");
    //middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/", router);
    app.use(express.static("public"));
    app.use(bodyParser.json());

    // routes
    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.log(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: "Yoda" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => res.json("Success"))
        .catch((error) => console.error(error));
    });

    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          res.json("Deleted Darth Vadar's quote");
        })
        .catch((error) => console.error(error));
    });

    //listen
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((error) => console.error(error));
