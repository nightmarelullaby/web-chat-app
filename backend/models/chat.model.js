import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    content:{
        type:String,
    },
    images:{
        type:Array
    },
    username:{
        type:String
    },
    authorId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const chatSchema = new Schema({
    users: {
        type: Array,
        required: true,
        trim: true,
        default: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    messages:{
        type:Array,
        default:[]},
}, { timestamps: true })
const Chat = model('Chat', chatSchema)
const Message =  model('Message', messageSchema)


Chat.watch()
    .on('change', async (data) => {
        try{
            const userThatWillBeNotified = data.fullDocument.from.id.toString()
            const allSockets = await io.fetchSockets()
            const [socketFiltered] = allSockets.filter(socket => socket.handshake.auth.mongoId === userThatWillBeNotified)
            const socketFilteredId = socketFiltered.id
            console.log(data.fullDocument,"sended")
            return io.to(socketFilteredId).emit("server:create-chat",data.fullDocument);
        }catch(error){
            console.log(error.message)
        }
        

});
export default Chat
export {Message}