export const getAllFriendsUsers = async (input) => {
	let headersList = {
 		"Accept": "*/*",
 		"Content-Type": "application/json",


	}
	
let response = await fetch("http://localhost:3001/api/getAllFriends?q="+input, { 
  method: "GET",
  headers: headersList,
  credentials: 'include', 
},{cache:"no-store"});

if(response.status !== 200){
		const {message} = await response.json()
		console.log("error",message)
		throw new Error("error!")
	}	
	const responseParsed = await response.json()
	return responseParsed
}

