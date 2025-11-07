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
})