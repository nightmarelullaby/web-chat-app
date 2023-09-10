export const updateFriendRequest = async (status,friendRequestId,toUserId) => {
	// return console.log(status,friendRequestId,toUserId)
	let headersList = {
 		"Accept": "*/*",
 		"Content-Type": "application/json",
	}
	let bodyContent = {
		status:status,
		friendRequestId:friendRequestId,
		toUser:{
			id:toUserId
		}
	}
	
let response = await fetch("http://localhost:3001/api/updateFriendRequestStatus", { 
  method: "PUT",
  headers: headersList,
  body:JSON.stringify(bodyContent),
  credentials: 'include', 
},{cache:"no-store"});

if(response.status !== 200){
		const {message} = await response.json()
		console.log("error",message)
		throw new Error("error!",message)
	}	
	const responseParsed = await response.json()
	return responseParsed
}

