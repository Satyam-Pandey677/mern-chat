const express = require("express");
const chats = require("./data/data.js");
const connectDb = require("./config/db.js");
const userRouter = require("./routers/userRouter.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

const app = express();
const port = process.env.PORT|| 8000;

app.use(express.json())

connectDb();

app.use("/api/user",userRouter)


app.use(notFound)
app.use(errorHandler)
app.listen(port,() => {
    console.log("server runnning in port: ",port)
})