import Chat,{Message} from "../models/chat.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Types } from "mongoose"

import { TOKEN_SECRET } from "../config.js";
import mongoose from "mongoose";
const getMyOwnChats = async (req, res) => {
    const id = req.user.id
    try {
        const chats = await Chat.find({ users: id },{messages:{"$slice":-1}})
        return res.status(200).json(chats)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }


}
const createChat = async (req, res) => {
    try {
        const authorId = req.user.id
        const { message, toUser } = req.body
        const newMessage = new Message({
            content:"",
            authorId,
        })
        const newChat = new Chat({
            users: [new Types.ObjectId(req.user.id), new Types.ObjectId(toUser.id)],
            messages: [newMessage]
        })
        const authorData = await User.findById(authorId)
        const toUserData = await User.findById(toUser.id)

        const addNewChatToAuthor = await authorData.chats.push(newChat.id)
        const addNewChatToUser = await toUserData.chats.push(newChat.id)

        const authorChatSaved = await authorData.save()
        const toUserChatSaved = await toUserData.save()
        const chatSaved = await newChat.save()
        return res.status(200).json({ chatSaved, toUserChatSaved, authorChatSaved })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}
const addMessageToChat = async (req, res) => {
    try {
        const chatId = req.body.chatId
        const content = req.body.content
        const chat = await Chat.findById(chatId)
        if(!chat) return res.status(401).json({message:"Chat not found"})
        chat.messages.push({
            authorId: req.user.id,
            content: content
        })
        const messageAdded = await chat.save()
        if (!chat) return res.status(404).json({ "message": "Chat not found" })

        return res.json(messageAdded)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getChatById = async (req, res) => {
    // return console.log(req.params)
    try {
        const chatId = req.params.id

        const chat = await Chat.findById(chatId).populate({path:"users",model:"User",select:"username"}).populate({path:"messages",populate:{path:"authorId",model:"User"}})
        if (!chat) return res.status(404).json({ message: "Chat not found" })
        return res.json(chat)
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }


}
export { getMyOwnChats, createChat, addMessageToChat, getChatById }