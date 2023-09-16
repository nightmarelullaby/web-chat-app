"use client"
import {useEffect} from "react"
import {useSocket} from "@/hooks/useSocket"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"

export default function SocketInitializer({userId,URL}){
    const [socket,isConnected] = useSocket(URL,{auth:{mongoId:userId}})
    const {currentSocket} = useSocketStore()

    useEffect(() =>{
        if(!socket) return
        useSocketStore.setState({currentSocket:socket})
    },[socket])

    useEffect(() =>{
        if(!currentSocket) return
    },[isConnected])
    return null
}    