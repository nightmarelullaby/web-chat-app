export const registerUser = async (data) => {
	const bodyContent = data
	const fetchBody = {

	}
	const URL = "http://localhost:3001/api/auth/register"

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
	return registerRequest.json()
}