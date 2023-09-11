"use client"
import { io } from 'socket.io-client';
import {useEffect,useState} from "react"
import socketioEvents from "@/utils/socketio.events.js"
const URL = 'https://chat-backend-r4ns.onrender.com';
let socket
export default function SocketController({token,id}){
	if(!token) return

	const [isConnected, setIsConnected] = useState(false);
	socket = io(URL,{
		auth:{ 
	 		token,	 	
	 		mongoId:id
	 	}
	});
	useEffect(() => {
		if(isConnected) return
		socket.connect()
		
		setIsConnected(socket.connected)
		socketioEvents(socket)
		// socket.emit("client:send-message",() =>null)
		return () => {
			socket.disconnect()
		}
	},[])
	return null
}
export {socket}