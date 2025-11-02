const { Router } = require("express");
const protect = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroup,removeFromGroup, addToGroup } = require("../controllers/chatContrroler");

const chatRouter = Router();


chatRouter.route("/").post(protect, accessChat);
chatRouter.route("/").get(protect, fetchChats);
chatRouter.route("/group").post(protect, createGroupChat);
chatRouter.route("/rename").put(protect, renameGroup);
chatRouter.route("/remove-user").put(protect, removeFromGroup);
chatRouter.route("/groupadd").put(protect, addToGroup);


module.exports = chatRouter;