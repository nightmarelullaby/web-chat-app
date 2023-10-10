import { NextResponse } from 'next/server'
import {cookies} from "next/headers";
	
export async function PUT(req,res){
	const cookieStore = cookies();
  	const {value} = cookieStore.get("token");
  	const body = await req.json()
  	var data = body
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
try{
	let response = await fetch(process.env.LOCAL_BACKEND+"/api/updateFriendRequestStatus", { 
	  method: "PUT",
	  headers: headersList,
	  body:JSON.stringify(bodyContent),
	});
	const json = await response.json()
	console.log(json,"Here xddd")

return NextResponse.json(json)
}catch(error){
	console.log(error,"hereee")
}
	

}



