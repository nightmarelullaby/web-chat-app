export const addMessageToChat = async (chatId,content) => {
	let headersList = {
 		"Accept": "*/*",
 		"Content-Type": "application/json",
	}
	let bodyContent = {
		chatId,
		content

	}
	
let response = await fetch("https://chat-backend-r4ns.onrender.com/api/addMessageToChat", { 
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
