const express = require("express");
const dotenv = require("dotenv");
const ConnectDB  = require("./config/db");
const colors = require("colors");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require('path')
const cors = require("cors");


app.use(cors({
  origin: "https://mern-messenger-1bnh.onrender.com",
  credentials: true
}));

dotenv.config();
ConnectDB()
const app = express();
app.use(express.json())


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


//----------------------------------------------------------------Deployment----------------------------------------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
//----------------------------------------------------------------Deployment----------------------------------------------------------------


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