const mongoose = require("mongoose");

const quotes = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    quote: {
      type: String,
      trim: true,
    },
  },
  { collection: "Quotes" }
);

const data = [
  {
    name: "Yoda",
    quote: "Do or do not. There is no try.",
  },
  {
    name: "Princess Leia",
    quote: "Help me, Obi-Wan Kenobi. You’re my only hope.",
  },
  {
    name: "Darth Vader",
    quote: "I find your lack of faith disturbing.",
  },
];

module.exports = mongoose.model("Quotes", quotes);
