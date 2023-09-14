export const createChat = async (id) => {	
let response = await fetch("/api/create-chat", { 
  method: "POST",
  body:JSON.stringify({id}),
});
	const responseParsed = await response.json()
	return responseParsed
}
