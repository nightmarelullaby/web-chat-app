"use client";
import { useEffect } from "react"
import { useSocketStore } from "@/store/useSocketStore"
import { useSocket } from "@/hooks/useSocket"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {useCurrentMessages} from "@/store/useCurrentMessages"

export default function SocketRoomEvents({chatId}){
    const {currentSocket} = useSocketStore()
    
    {/*--- Joining room based on chatId --- */}
    useEffect(() =>{
        if(!currentSocket) return;
        currentSocket.emit('client:join-chat',chatId)
    },[currentSocket])
    {/*--- ----------------------------- ---*/}
    
    return null
}
