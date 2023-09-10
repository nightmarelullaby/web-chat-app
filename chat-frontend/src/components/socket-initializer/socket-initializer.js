// "use client";
import cookie from "cookie"
import dynamic from 'next/dynamic'
import jwt from 'jwt-decode'

const DynamicController = dynamic(() => import("./SocketController"), {
  ssr:false,
  suspense:true
})
import {cookies as nextCookies} from "next/headers";
 
// import { socket } from '../../socket';
// import {useEffect,useState} from "react"
export default function SocketInitializer(){
	const cookieStore = nextCookies();
	const {value} = cookieStore.get("token");

	const {id} = jwt(value)
	console.log("this is the id:",id)
	return <DynamicController token={value} id={id}/>
}