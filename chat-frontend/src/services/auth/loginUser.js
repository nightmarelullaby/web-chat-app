import Cookies from "js-cookie"
export const loginUser = async (data) => {
	const bodyContent = data
	const URL = "https://chat-backend-r4ns.onrender.com/api/auth/login"
		const registerRequest = await fetch(URL , {
		method: 'POST',
		headers: {
      		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(bodyContent)
	})

	if(registerRequest.status !== 200){
		const error = await registerRequest.json()		
		throw new Error(error.message)
	}	
	const responseParsed = await registerRequest.json()
	Cookies.set('token', responseParsed.token,{ expires: 365})
	return responseParsed
}