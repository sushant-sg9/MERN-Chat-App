const express = require("express");
const dotenv = require("dotenv");
const ConnectDB  = require("./config/db");
const colors = require("colors");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
ConnectDB()
const app = express();
app.use(express.json())


app.get("/", (req, res) => {
    res.send("API is Running Sucessfully");
})
// app.get("/api/chat", (req, res) => {
//     res.send(chats);
// })

// app.get("/api/chat/:id", (req, res) => {
//     // console.log(req.params.id);
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat);
// })
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}` .yellow.bold));