import {cookies} from "next/headers";
export const getChatById = async (id) => {
	const cookieStore = cookies();
  const {value} = cookieStore.get("token");
	let headersList = {
 		"Accept": "*/*",
 		"Cookie":`token=${value}`,
 		"Content-Type": "application/json",
	}
	
let response = await fetch("https://chat-backend-r4ns.onrender.com/api/getChatById/"+id, { 
  method: "GET",
  headers: headersList,
  credentials: 'include', 
},{cache:"no-store"});

if(response.status !== 200){
		const {message} = await response.json()
		console.log("error",message)
		throw new Error(message)
	}	
	const responseParsed = await response.json()
	return responseParsed
}

