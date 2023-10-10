import {cookies} from "next/headers";

export const getUserInformation = async () => {
	const cookieStore = cookies();
  	const {value} = cookieStore.get("token");
	let headersList = {
 		"Accept": "*/*",
		"Cookie":`token=${value}`,
 		"Content-Type": "application/json"
	}
let response = await fetch(process.env.LOCAL_BACKEND+ "/api/auth/verify", { 
  method: "GET",
  headers: headersList
},{cache:"no-store"});
if(response.status !== 200){
		const {message} = await response.json()
		console.log("error here",message)
		throw new Error("error!",message)
	}	
	const responseParsed = await response.json()
	return responseParsed
}