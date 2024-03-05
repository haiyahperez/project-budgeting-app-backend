const express = require ("express");
const transactions = express.Router();
let transactionsArray = require("../models/transaction.model.js");

function validateForm(req, res, next) {
    if (!req.body.item || !req.body.category || !req.body.amount || !req.body.from || !req.body.date)
      res.status(400).json({ message: "Invalid Inputs" });
    else next();
}

transactions.get("/", (req, res) => {
    res.json({ transactions: transactionsArray});
});

transactions.get("/:id", (req, res) => {
    const { id } = req.params;

    const transaction = transactionsArray.find((transaction) => transaction.id === +id);
    if (transaction)res.status(200).json({ transaction: transaction });
    else res.status(400).json({ error: "ID not found"})
})

transactions.post("/", validateForm, (req, res) => {
    const id = transactionsArray[transactionsArray.length - 1].id + 1
    req.body.id = id
    transactionsArray.push(req.body)
    res.status(200).json({ transactions: transactionsArray});
});

transactions.put("/:id", validateForm,  (req, res) => {
    const { id } = req.params
    const transactionIndex = transactionsArray.findIndex((transaction) => transaction.id === +id);
    
    if (transactionIndex > -1) {
        transactionsArray[transactionIndex] = req.body;
        res.status(200).json({ message: 'Transaction updated successfully', transacation: transactionArray});
    } else {
        res.json ({ transactions: transactionsArray}); 
    }
});

transactions.delete("/:id", (req, res) => {
    const { id } = req.params
    transactionsArray = transactionsArray.filter((transaction) => transaction.id !== +id)
    res.json({ transactions: transactionsArray})
    res.status(204).end();
})

module.exports = transactions;