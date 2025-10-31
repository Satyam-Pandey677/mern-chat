const { Router } = require("express");
const  {createUser, auth, allUser}  = require("../controllers/user");
const protect = require("../middleware/authMiddleware");

const userRouter = Router()

userRouter.route("/").post(createUser)
                    .get(protect, allUser)
userRouter.route("/login").post(auth);


module.exports =userRouter;