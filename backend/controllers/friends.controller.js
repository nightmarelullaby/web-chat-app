import friendRequest from "../models/friendRequest.model.js"
import User from "../models/user.model.js"
import { Types } from "mongoose"
import Chat,{Message} from "../models/chat.model.js"

const sendFriendRequest = async (req, res) => {
    try {
        const { toUser } = req.body

        const fromUserId = req.user.id
        if (toUser.id === fromUserId) return res.status(500).json({ message: "You cant send friend request yourself" })
        const fromUserData = await User.findById(fromUserId)
        const toUserData = await User.findById(toUser.id)
        if(fromUserData.friends.includes(new Types.ObjectId(toUserData._id))) return res.status(400).json({ message: "Friend already added" })

        if (!fromUserData || !toUserData) return res.status(404).json({ message: "User not found" })

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

        const friendRequestSend = await newFriendRequest.save()

        await toUserData.save()
        await fromUserData.save()
        return res.json(friendRequestSend)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getAllFriendUsers = async (req,res) => {
    const query = req.query.q

    try{
        const userId = new Types.ObjectId(req.user.id)
        if(!userId) res.status(400).json({message:"User id doesn't exists"})
       
        const users = await  User.find({username:{$regex:query},_id:{$nin:[userId]}})
        res.json(users)
        return res.end()
    }catch(error){
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
    
}
const updateFriendRequestStatus = async (req, res) => {
    try {
        const { status, toUser, friendRequestId } = req.body;
        const authorId = req.user.id
        if(!status || !toUser || !friendRequestId || !authorId) return res.status(400).json({message:"Bad request"})
        
        if (status === "deny") {
            const deletedRequest = await friendRequest.findByIdAndRemove(friendRequestId)
            if(!deletedRequest) return res.status(400).json({message:"not found!"})
            const toUserData = await User.findByIdAndUpdate(toUser.id, {
                "$pull": { friendRequests: new Types.ObjectId(friendRequestId) }
            })
            const authorRemoved = await User.findByIdAndUpdate(authorId, {
                "$pull": { friendRequests: new Types.ObjectId(friendRequestId) }
            })
            const authorData = await User.findById(authorId)

            if (!authorData || !toUserData) return res.status(400).json({ message: "User not found" })

            return res.json({ toUserData, authorData, deletedRequest })

        }
        if (status === "accept") {
            const newChat = new Chat({
                    users: [new Types.ObjectId(authorId), new Types.ObjectId(toUser.id)],
                    messages: []
            })
            const chatSaved = await newChat.save()
            const toUserData = await User.findByIdAndUpdate(toUser.id, {
                "$push": { friends: authorId,chats: chatSaved._id },
                "$pull": { friendRequests: new Types.ObjectId(friendRequestId) }
            });

            const addedToAuthor = await User.findByIdAndUpdate(authorId, {
                "$push": { friends: toUser.id,chats: chatSaved._id  },
                "$pull": { friendRequests: new Types.ObjectId(friendRequestId) }
            });

            if (!authorData || !toUserData) return res.status(400).json({ message: "User not found" })
                
            return res.json({ toUserData, authorData, addedToAuthor })
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export { sendFriendRequest, updateFriendRequestStatus,getAllFriendUsers }