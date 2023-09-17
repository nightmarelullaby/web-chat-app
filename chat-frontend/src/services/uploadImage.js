export const uploadImage = async (formdata) => {	
	let response = await fetch("/api/upload-image", { 
  	method: "POST",
  	body:formdata,
	});
	const json = await response.json()
	return json
}