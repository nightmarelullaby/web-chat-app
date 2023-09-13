import Cookies from "js-cookie"
import axios from "axios"
export const getAllFriendsUsers = async (input) => {
	let response = await fetch("/api/get-all-friends?q="+input);
	const json = await response.json()
	return json

}

