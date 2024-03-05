const express = require("express");
const cors = require("cors");

const app = express();

const transactionsController = require("./controllers/transactions.controller.js")


app.use(cors());
app.use(express.json());

app.use("/transactions", transactionsController)

app.get("/", (req, res) => {
    res.send("Welcome to the Wallet Wizard");
});

app.all("*", (req, res) => {
    res.json({ error: "Page not found"});
});

module.exports = app;