"use client"
import {useEffect} from "react"
import {useSocket} from "@/hooks/useSocket"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"
const URL = "http://localhost:3001"
export default function SocketInitializer(){
    const [socket,isConnected] = useSocket(URL,{auth:{mongoId:useUserInformationStore.getState().userInfo._id}})
    const {setCurrentSocket,currentSocket} = useSocketStore()

    useEffect(() =>{
        if(!isConnected) return
        useSocketStore.setState({currentSocket:socket})
        socket.on("server:status-updated",(updated) => {
            return useUserInformationStore.setState({userInfo:updated})
        })
        return () => {
            socket.off("server:status-updated",(msg) => console.log(msg))
        }

    },[isConnected])
    return null
}    