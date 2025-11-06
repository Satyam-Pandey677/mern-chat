const Message = require("../models/messageModel.js")
const User = require("../models/userModel.js")
const Chat = require("../models/chatModel.js")


const sendMessages = async(req, res) => {

    const {content, chatId} =req.body;

    if(!content || !chatId) {
        console.log("invalid data passe into request")
        res.status(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        let message  = await Message.create(newMessage);

        message = await message.populate("sender", "username pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path:"chat.users",
            select:"name pic email"
        })

         await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage: message
        })


        res.json(message)

    } catch (error) {
        res.status(400)
        throw new Error(error.message)

    }

}

const allMessages = async(req,res) => {
    try {
        const message = await Message.find({
            chat:req.params.chatId
        }).populate("sender", "username pic email")
        .populate("chat")

        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
}   

module.exports = {
    sendMessages,
    allMessages
}