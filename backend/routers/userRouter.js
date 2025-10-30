const { Router } = require("express");
const  {createUser, auth}  = require("../controllers/user");

const userRouter = Router()

userRouter.route("/").post(createUser);
userRouter.route("/login").post(auth);


module.exports =userRouter;