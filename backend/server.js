const express = require("express");
const chats = require("./data/data.js");
const connectDb = require("./config/db.js");
const userRouter = require("./routers/userRouter.js");

const app = express();
const port = process.env.PORT|| 8000;


connectDb();

app.use(express.json())

app.use("/api/user",userRouter)

app.listen(port,() => {
    console.log("server runnning in port: ",port)
})