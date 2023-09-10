"use client"
import {Friend} from "./friend"
import {createChat} from "@/services/createChat"
export default function FriendsList({data}){
		return <>{data.map(friend => <Friend onOpenChat={()=>createChat(friend._id)} username={friend.username}/>)}</>
}