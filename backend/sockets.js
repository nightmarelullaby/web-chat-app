import friendRequest from "./models/friendRequest.model.js"
import User from "./models/user.model.js"
import Chat,{Message} from "./models/chat.model.js"

export default (io) => {
    
	io.on("connection", async (socket) => {
        const rooms = io.of("/").adapter.rooms;

		console.log("new socket connected",socket.id)

        socket.on('client:add-message', async (data)=> {
            const newMessage = new Message({
                content:data.content,
                authorId:data.authorId,
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

		socket.on("client:send-message", (data) => {
      		console.log(socket.id, "sended a message",data);
            io.emit("server:emit-response","hello")
    	});

		socket.on("disconnect", () => {
      		console.log(socket.id, "disconnected");
    	});
	})


}