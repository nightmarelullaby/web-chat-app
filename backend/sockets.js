import friendRequest from "./models/friendRequest.model.js"
import User from "./models/user.model.js"
import Chat,{Message} from "./models/chat.model.js"

export default (io) => {
    
	io.on("connection", async (socket) => {
        const rooms = io.of("/").adapter.rooms;

		console.log("new socket connected",socket.id)

        socket.on('client:add-message', async (data)=> {
            console.log(data.chatId,"hola tio xd")
            const newMessage = new Message({
                content:data.content,
                authorId:data.authorId,
            })
            const chatFound = await Chat.findByIdAndUpdate(data.chatId,{"$push":{messages:newMessage}},{new:true})

            io.to(data.chatId.toString()).emit("server:added-message",chatFound);
            return console.log("emitted message",data.content)
        })

        socket.on('client:join-chat', async (data) => {
            let room = data.toString()
            socket.join(room)
        })
    	socket.on("client:update-status",async(data) => {
        const userId = data.id
        const status = data.status
        const statusUpdated = await User.findByIdAndUpdate(userId,{"$set":{status:status}},{new:true}).populate("friendRequests",{}).populate("friends").populate({path:"chats",populate:{path:"users",model:"User"}})
        if(!statusUpdated) return res.status(401).json({message:"User not found"})
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