import { Schema, model } from "mongoose";
import User from "./user.model.js";
import {io} from "../index.js"
export const friendRequestSchema = new Schema({
    from: {
        id:{
            type: Schema.Types.ObjectId,
            ref: "user"    
        },
        username:{
            type:String
        }
        
    },
    to: {
        id:{
            type: Schema.Types.ObjectId,
            ref: "user"    
        },
        username:{
            type:String
        }
        
    },
    status: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// friendRequestSchema.pre("remove", async function (next) {
//     try {
//         await User.remove({
//             "
//             ":{
//                 "$in": this.friendRequests
//         }
//         })
// const all = await User.find()
// console.log(all)
// next()
//     }catch (error) {
//     console.log(error.message)
//     next(error)
// }


//     // const a = await userModel.find()

// })
const friendRequest = model('friendRequest', friendRequestSchema)
friendRequest.watch()
    .on('change', async (data) => {
        try{
            const userThatWillBeNotified = data.fullDocument.to.id.toString()
            const allSockets = await io.fetchSockets()
            const [socketFiltered] = allSockets.filter(socket => socket.handshake.auth.mongoId === userThatWillBeNotified)
            const socketFilteredId = socketFiltered.id
            console.log(data.fullDocument,"sended")
            return io.to(socketFilteredId).emit("server:send-notification",data.fullDocument);
        }catch(error){
            console.log(error.message)
        }
        

});
    
export default friendRequest