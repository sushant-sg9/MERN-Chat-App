const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const ConnectDB  = require("./config/db");
const colors = require("colors");



const app = express();
dotenv.config();
ConnectDB()

app.get("/", (req, res) => {
    res.send("API is Running Sucessfully");
})

app.get("/api/chat", (req, res) => {
    res.send(chats);
})

app.get("/api/chat/:id", (req, res) => {
    // console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}` .yellow.bold));