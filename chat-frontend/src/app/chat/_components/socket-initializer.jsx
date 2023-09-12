"use client"
import {useEffect} from "react"
import {useSocket} from "@/hooks/useSocket"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"

export default function SocketInitializer({userId,URL}){
    const [socket,isConnected] = useSocket(URL,{auth:{mongoId:userId}})
    const {setCurrentSocket,currentSocket} = useSocketStore()

    useEffect(() =>{
        if(!socket) return
        useSocketStore.setState({currentSocket:socket})
    },[socket])

    useEffect(() =>{
        if(!currentSocket) return

        currentSocket.on("server:status-updated",(updated) => {
            return useUserInformationStore.setState({userInfo:updated})
        })
        return () => {
            currentSocket.off("server:status-updated",(msg) => console.log(msg))
        }

    },[isConnected])
    return null
}    