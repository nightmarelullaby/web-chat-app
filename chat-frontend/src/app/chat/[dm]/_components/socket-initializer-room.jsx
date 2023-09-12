"use client";
import { useEffect } from "react"
import { useSocketStore } from "@/store/useSocketStore"
import { useSocket } from "@/hooks/useSocket"

export default function SocketInitializer({chatId}){
    const {setCurrentSocket,currentSocket} = useSocketStore()

    useEffect(() =>{
        console.log(chatId)
        if(!currentSocket) return
            currentSocket.emit('client:join-chat',chatId)
            currentSocket.on("server:added-message",(msg) => console.log(msg))
    },[currentSocket])
    return null
}
