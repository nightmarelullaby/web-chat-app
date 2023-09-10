"use client"
import {useEffect,useState} from "react"
import { io } from 'socket.io-client';

const useSocket = (URL,options) => {
	const [socket,setSocket] = useState(null)
	const [isConnected, setIsConnected] = useState(false);
	const socketio = io(URL,options)

	useEffect(() => {
		if(isConnected) return;
		setSocket(socketio)
		setIsConnected(socketio.connected)

		return () => {
			if(!socket) return
			socket.disconnect()
		}
	},[isConnected])

	return [socket,isConnected]
}

export {useSocket}