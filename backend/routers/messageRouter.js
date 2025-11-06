const {Router} = require("express")
const protect = require("../middleware/authMiddleware")
const { sendMessages, allMessages } = require("../controllers/messageController")

const messageRouter = Router()

messageRouter.route("/").post(protect, sendMessages)
messageRouter.route("/:chatId").get(protect, allMessages)

module.exports = messageRouter