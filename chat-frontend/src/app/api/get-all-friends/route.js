import { NextResponse } from 'next/server'
import {cookies} from "next/headers";

export async function GET(req,res){
	const cookieStore = cookies();
  	const {value} = cookieStore.get("token");

	const { searchParams } = new URL(req.url)
  	const q = searchParams.get('q')
	let headersList = {
		"Accept": "*/*",
		"Cookie":"token="+value,
	 	"Content-Type": "application/json"
	}

	let response = await fetch("https://chat-backend-r4ns.onrender.com/api/getAllFriends?q="+q, { 
	  method: "GET",
	  headers: headersList
	});
	if(response.status !== 200){
		const error = await response.json()
		return NextResponse.json({message:error.message},{status:401})
	}
	const json = await response.json()
	return NextResponse.json(json)
}