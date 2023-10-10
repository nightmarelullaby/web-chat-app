export const updateFriendRequest = async (status,friendRequestId,toUserId) => {
	let bodyContent = {
		status,
		friendRequestId,
		toUserId
	}
	
let response = await fetch("/api/update-friend-request", { 
  method: "PUT",
  body:JSON.stringify(bodyContent),
});
	const responseParsed = await response.json()
	return responseParsed
}

