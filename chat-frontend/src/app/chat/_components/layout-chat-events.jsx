"use client"
import {useSocketStore} from "@/store/useSocketStore"
import {useEffect} from "react"
import {useUserInformationStore} from "@/store/useUserInformationStore"

export default function LayoutChatEvents(){
	const {setCurrentSocket,currentSocket} = useSocketStore()

	useEffect(() => {
		if(!currentSocket) return;
		currentSocket.on("server:send-notification", (data) => {
		console.log("you recived a new notification!",data)
		const prev = useUserInformationStore.getState().userInfo.friendRequests
		useUserInformationStore.setState(state => ({userInfo:{friendRequests:[...prev,data]}}))
		console.log(useUserInformationStore.getState().userInfo.friendRequests,"new")
		})
		currentSocket.on("server:update-user", (data) => {
			useNotificationsStore.setState(state => ({userInfo:data}))
			console.log(useNotificationsStore.getState().userInfo,"new")

		})
		currentSocket.on('server:added-message',(data)=> {
				useCurrentMessages.setState(state => ({newMessage:data}))
		})
		currentSocket.on("server:create-chat", (data) => {
			console.log("created chat",data)
			useNotificationsStore.setState(state => ({userInfo:{chats:[...state.userInfo.chats,data]}}))
		})
	},[currentSocket])
	return null
}