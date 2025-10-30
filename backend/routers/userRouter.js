const { Router } = require("express");
const  {createUser}  = require("../controllers/user");

const userRouter = Router()

userRouter.route("/").post(createUser);


module.exports =userRouter;