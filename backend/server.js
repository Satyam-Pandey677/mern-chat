const express = require("express");
const chats = require("./data/data.js");
const connectDb = require("./config/db.js");
const userRouter = require("./routers/userRouter.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const chatRouter = require("./routers/chatRouter.js");
const messageRouter = require("./routers/messageRouter.js");
const cors = require("cors")

const {Server} = require("socket.io")
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())
connectDb();


app.use("/api/user",userRouter)
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRouter)


app.use(notFound)
app.use(errorHandler)


const server = app.listen(port,() => {
    console.log("server runnning in port: ",port)
})


const io = new Server(server, {
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:5173"
    }
})



io.on("connection", (socket) => {
    console.log("Connected To socket.io")

    socket.on("setup", (userData) => {
        socket.join(userData._Id);
        socket.emit("connected")
    })

    socket.on('join chat', (room) =>{
        socket.join(room);
        console.log("user join room "+ room)
    })

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat
        console.log(newMessageReceived)
        if(!chat.users) return console.log("Chat.users not defined");

        chat.users.forEach(user => {
            if(user._id == newMessageReceived.sender._id) return;
            
            socket.in(user._id).emit("message recieved", newMessageReceived)
        })
    })
})