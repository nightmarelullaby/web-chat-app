"use client"
import {useSocketStore} from "@/store/useSocketStore"
import {useEffect} from "react"
import {useUserInformationStore} from "@/store/useUserInformationStore"

export default function LayoutChatEvents(){
	const {currentSocket} = useSocketStore()

	const handleNotificationReceived = (data) => {
		return useUserInformationStore.setState({friendRequests:[data]})
	}

	const handleStatusUpdated = (data) => {
		return useUserInformationStore.setState(state => ({status:data.status}))
	}
	const handleProfileImageUpdated = (data) => {
		return useUserInformationStore.setState(state => ({profileImage:data.profileImage}))
	}
	useEffect(() => {
		if(!currentSocket) return;
		currentSocket.on("server:send-notification", handleNotificationReceived)
		currentSocket.on("server:status-updated",handleStatusUpdated)
		currentSocket.on("server:profile-image-updated",handleProfileImageUpdated)
		return () => {
			currentSocket.off("server:send-notification", handleNotificationReceived)
			currentSocket.off("server:status-updated",handleStatusUpdated)
			currentSocket.off("server:profile-image-updated",handleProfileImageUpdated)
		}
	},[currentSocket])
	return null
}