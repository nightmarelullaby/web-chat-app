"use client"
import {Friend} from "./friend"
import {createChat} from "@/services/createChat"
import {useRouter} from "next/navigation"
import {useUserInformationStore} from "@/store/useUserInformationStore"

export default function FriendsList({data}){
	const router = useRouter()
		return <>{data.map(friend => <Friend 
			onOpenChat={()=>{
				console.log(useUserInformationStore.getState().chats)
				console.log(friend.chats.filter(chat => useUserInformationStore.getState().chats.includes(chat)))}}
			username={friend.username}/>)}</>
}