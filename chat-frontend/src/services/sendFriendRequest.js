export const sendFriendRequest = async (id) => {
	let bodyContent = {id}
	
let response = await fetch("/api/send-friend-request", { 
  method: "POST",
  body:JSON.stringify(bodyContent),
});

}

