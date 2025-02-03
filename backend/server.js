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
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}` .yellow.bold));

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin: "http://localhost:3000",
    }
});

io.on("connection",(socket) => {
    console.log("connected to socket.io")
    socket.on('setup', (userData) =>{
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on('join chat', (room)=>{
        socket.join(room)
        console.log('user joined chat', room)
    })

    socket.on('new message', (newMessageRecevied)=>{
        var chat = newMessageRecevied.chat;

        if(!chat.users) return console.log('chat user not defined');

        chat.users.forEach(user => {
            if(user._id == newMessageRecevied.sender._id) return;

            socket.in(user._id).emit("message received", newMessageRecevied)
        })
    })
})