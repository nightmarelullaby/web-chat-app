import {useUserInformationStore} from "@/store/useNotificationsStore"
import {useCurrentMessages} from "@/store/useCurrentMessages"
export default function socketioEvents (socket){
	if(!socket) return null
	socket.on("server:send-notification", (data) => {
		console.log("you recived a new notification!",data)
		const prev = useUserInformationStore.getState().userInfo.friendRequests
		useUserInformationStore.setState(state => ({userInfo:{friendRequests:[...prev,data]}}))
		console.log(useUserInformationStore.getState().userInfo.friendRequests,"new")

	})
	socket.on("server:update-user", (data) => {
		console.log("you recived a new notification!",data)
		useNotificationsStore.setState(state => ({userInfo:data}))
		console.log(useNotificationsStore.getState().userInfo,"new")

	})
	socket.emit("client:join-chat","x")
	socket.on('server:added-message',(data)=> {
		console.log(data)
			useCurrentMessages.setState(state => ({newMessage:data}))
	})
	socket.on("server:create-chat", (data) => {
		console.log("created chat",data)
		useNotificationsStore.setState(state => ({userInfo:{chats:[...state.userInfo.chats,data]}}))
	})
}