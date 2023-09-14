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
	
let response = await fetch(process.env.LOCAL_BACKEND + "/api/sendFriendRequest", { 
  method: "POST",
  headers: headersList,
  body:JSON.stringify(bodyContent),
});

	if(response.status !== 200){
		const {message} = await response.json()
		return NextResponse.json(message,{status:400})
	}	
	const responseParsed = await response.json()
	return NextResponse.json(responseParsed)
	}	
	catch(error){
		return NextResponse.json({message:error.message},{status:500})
	
}

}