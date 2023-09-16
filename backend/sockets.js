import friendRequest from "./models/friendRequest.model.js"
import User from "./models/user.model.js"
import Chat,{Message} from "./models/chat.model.js"
import { Types } from "mongoose"
export default (io) => {
    
	io.on("connection", async (socket) => {
        const rooms = io.of("/").adapter.rooms;

		console.log("new socket connected",socket.id)

        socket.on('client:add-message', async (data)=> {
            const newMessage = new Message({
                content:data.content,
                authorId:data.authorId,
                images:data.images
            })
            const messageAdded = await newMessage.save()
            const chatFound = await Chat.findByIdAndUpdate(data.chatId,{"$push":{messages:messageAdded}},{new:true})
            const chats = await Chat.findById(data.chatId).populate("users")
            return io.to(data.chatId.toString()).emit("server:added-message",chats);
        })

        socket.on('client:join-chat', async (data) => {
            let room = data.toString()
            socket.join(room)
        })
    	socket.on("client:update-status",async(data) => {
            const userId = data.id
            const status = data.status
            const statusUpdated = await User.findByIdAndUpdate(userId,{"$set":{status:status}},{new:true})
            if(!statusUpdated) return;            
            socket.emit("server:status-updated",statusUpdated)
        })

		socket.on("client:send-notification", async (data) => {
            return console.log(data)
                try {
                    const { toUser } = data
                    const fromUserId = data
                    if (toUser.id === fromUserId) return socket.emit("server:send-notification",{error:"You cant send notification to yourself"})
                    const fromUserData = await User.findById(fromUserId)
                    const toUserData = await User.findById(toUser.id)
                    if(fromUserData.friends.includes(toUserData._id)) return socket.emit("server:send-notification",{error:"Friend already added"})
                    if (!fromUserData || !toUserData) return socket.emit("server:send-notification",{error:"User not found"})

                    const newFriendRequest = new friendRequest({
                        from: {
                            id:fromUserId,
                            username:fromUserData.username
                        },
                        to: {
                            id:toUser.id,
                            username:toUserData.username
                        },
                        status: "pending"
                    })
                    fromUserData.friendRequests.push({ _id: newFriendRequest._id })
                    toUserData.friendRequests.push({ _id: newFriendRequest._id })

                    const friendRequestSend = await newFriendRequest.save({},{new:true})

                    await toUserData.save()
                    await fromUserData.save()
                    return res.json(friendRequestSend)

                } catch (error) {
                    return socket.emit("server:send-notification",{error:error.message})
                }
      		console.log(socket.id, "sended a message",data);
            return socket.emit("server:send-notification","hello")
    	});


		socket.on("disconnect", () => {
      		console.log(socket.id, "disconnected");
    	});
	})


}