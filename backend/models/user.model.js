import { Schema, model } from "mongoose";
import { friendRequestSchema } from "./friendRequest.model.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        unique: true,
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid"],
        required: [true, "Email is required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    status:{
        type:String,
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }],
    friendRequests: [{
        type: Schema.Types.ObjectId,
        ref: "friendRequest"
    }]
}, { timestamps: true })
const User =  model('User', userSchema)

User.watch()
    .on('change', async (data) => {
        try{
            // const userThatWillBeNotified = data.fullDocument.to.id.toString()
            // const allSockets = await io.fetchSockets()
            // const [socketFiltered] = allSockets.filter(socket => socket.handshake.auth.mongoId === userThatWillBeNotified)
            // const socketFilteredId = socketFiltered.id
            // console.log(data.fullDocument,"sended")
            // return io.to(socketFilteredId).emit("server:send-notification",data.fullDocument);
        }catch(error){
            console.log(error.message)
        }
});
export default User