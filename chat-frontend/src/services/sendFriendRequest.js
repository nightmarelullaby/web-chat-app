export const sendFriendRequest = async (id) => {
	let headersList = {
 		"Accept": "*/*",
 		"Content-Type": "application/json",
	}
	let bodyContent = {
		toUser:{
			id}
	}
	
let response = await fetch("http://localhost:3001/api/sendFriendRequest", { 
  method: "POST",
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

