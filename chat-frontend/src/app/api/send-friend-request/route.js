import { NextResponse } from 'next/server'
import {cookies} from "next/headers";
	
		
export async function POST (req,res){
	try{
	const cookieStore = cookies();
  const {value} = cookieStore.get("token");
  const body = await req.json()
  var data = body.body

	let headersList = {
 		"Accept": "*/*",
 		"Cookie":"token="+value,
 		"Content-Type": "application/json",
	}

	let bodyContent = {
		toUser:{id:body.id}
	}
	
let response = await fetch("https://chat-backend-r4ns.onrender.com/api/sendFriendRequest", { 
  method: "POST",
  headers: headersList,
  body:JSON.stringify(bodyContent),
});

if(response.status !== 200){
		const {message} = await response.json()
		console.log("error",message)
		throw new Error("error!",message)
	}	
	const responseParsed = await response.json()
	return responseParsed
	}	
	catch(error){
	console.log(error)	
	
}

}