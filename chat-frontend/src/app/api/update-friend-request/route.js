import { NextResponse } from 'next/server'
import {cookies} from "next/headers";
	
	

export async function POST(req,res){
	const cookieStore = cookies();
  const {value} = cookieStore.get("token");
  const body = await req.json()
  var data = body
  console.log(data)
	let headersList = {
 		"Accept": "*/*",
 		"Cookie":"token="+value,
 		"Content-Type": "application/json",
	}

	let bodyContent = {
		status:data.status,
		friendRequestId:data.friendRequestId,
		toUser:{
			id:data.toUserId
		}}
	
	let response = await fetch(process.env.LOCAL_BACKEND+"/api/updateFriendRequestStatus", { 
	  method: "POST",
	  headers: headersList,
	  body:JSON.stringify(bodyContent),
	});
	const json = await response.json()

return NextResponse.json(json)

}



