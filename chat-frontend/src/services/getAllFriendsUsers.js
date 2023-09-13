import Cookies from "js-cookie"

export const getAllFriendsUsers = async (input) => {
	const token = Cookies.get("token")
	let headersList = {
 		"Accept": "*/*",
 		"Content-Type": "application/json",
	}
	
let response = await fetch("https://chat-backend-r4ns.onrender.com/api/getAllFriends?q="+input, { 
  method: "GET",
  headers: headersList, 
  credentials:'include'
});

if(response.status !== 200){
		const message = await response.json()
		console.log("error",message)
		throw new Error("error!")
	}	
	const responseParsed = await response.json()
	return responseParsed
}

