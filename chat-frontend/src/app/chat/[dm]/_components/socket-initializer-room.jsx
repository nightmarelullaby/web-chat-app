"use client";
import { useEffect } from "react"
import { useSocketStore } from "@/store/useSocketStore"
import { useSocket } from "@/hooks/useSocket"

export default function SocketInitializer({url,id,chatId}){
    const [socket,isConnected] = useSocket(url,{auth:{mongoId:id}})

useEffect(() => {
    useSocketStore.setState({currentSocket:socket})
    console.log("after set",useSocketStore.getState().currentSocket)
},[socket])

useEffect(() =>{
    console.log("here are the socket",url,id,chatId, socket)
    // if(!isConnected) return
    console.log("after set",socket)
    socket.emit('client:join-chat',chatId)
    socket.on("server:added-message",(msg) => console.log(msg))
},[isConnected])
    return null
}
