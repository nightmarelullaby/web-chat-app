export const loginUser = async (data) => {
	
	const bodyContent = data
	const fetchBody = {

	}
	const URL = "http://localhost:3001/api/auth/login"

		const registerRequest = await fetch(URL , {
		method: 'POST',
		credentials: 'include', 
		headers: {
      		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(bodyContent)
	})
	if(registerRequest.status !== 200){
		const error = await registerRequest.json()
		console.log(error)
		throw new Error(error.message)
	}	
	const responseParsed = await registerRequest.json()
	console.log(responseParsed)
	return responseParsed
}