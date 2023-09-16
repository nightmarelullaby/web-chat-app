"use client"
import {useSocketStore} from "@/store/useSocketStore"
import {useEffect} from "react"
import {useUserInformationStore} from "@/store/useUserInformationStore"

export default function LayoutChatEvents(){
	const {currentSocket} = useSocketStore()

	const handleNotificationReceived = (data) => {
		console.log("new notification")
		const prev = useUserInformationStore.getState().friendRequests
		return useUserInformationStore.setState({friendRequests:[...prev,data]})
	}

	const handleStatusUpdated = (data) => {
		const prev = useUserInformationStore.getState().friendRequests
		return useUserInformationStore.setState(state => ({status:data.status}))

	}
	useEffect(() => {
		console.log(currentSocket)
		if(!currentSocket) return;
		currentSocket.on("server:send-notification", handleNotificationReceived)
		currentSocket.on("server:status-updated",handleStatusUpdated)
		return () => {
			currentSocket.off("server:send-notification", handleNotificationReceived)
			currentSocket.off("server:status-updated",handleStatusUpdated)
		}
	},[currentSocket])
	return null
}