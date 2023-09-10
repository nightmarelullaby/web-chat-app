import {cookies} from "next/headers";

export const getUserInformation = async (data) => {
	const cookieStore = cookies();
  	const {value} = cookieStore.get("token");
	let headersList = {
 		"Accept": "*/*",
		"Cookie":`token=${value}`,
 		"Content-Type": "application/json"
	}
	console.log(value)
let response = await fetch("http://localhost:3001/api/auth/verify", { 
  method: "GET",
  headers: headersList
},{cache:"no-store"});
if(response.status !== 200){
		const {message} = await response.json()
		console.log("error",message)
		throw new Error("error!")
	}	
	const responseParsed = await response.json()
	return responseParsed
}