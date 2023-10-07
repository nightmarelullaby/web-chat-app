export default async function convertToBase64(file,callback){
	return new Promise((res,rej) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			res(reader.result)
		}
		reader.onerror = error => {
			rej(error)
		}
	})
	
}