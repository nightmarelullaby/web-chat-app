"use client"
import {Searchbar} from "./searchbar"
import {getAllFriendsUsers} from "@/services/getAllFriendsUsers"
import {useState,useEffect} from "react"
import {sendFriendRequest} from "@/services/sendFriendRequest"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"

function useDebounce(input,delay){
	const [debouncedValue,setDebouncedValue] = useState(input)
	const {currentSocket} = useSocketStore()
	useEffect(() => {
		const timer = setTimeout(() => { setDebouncedValue(input) },delay)
		return ()=> clearTimeout(timer)
	},[input,delay])

	return [debouncedValue]
}
// function sendFriendRequest (id,ownId){
// 	return currentSocket.emit("client:send-notification",{toUser:{id},fromUserId:ownId})
// }
export default function SearchbarFetch(){
	const [SearchbarValue,setSearcbarValue] = useState("")
	const [debouncedValue] =  useDebounce(SearchbarValue,200)
	const [results,setResults] = useState([])
	const [loading,setLoading] = useState(false)
	useEffect(() => {
		if(SearchbarValue === "") return
		(async () => {
			setLoading(true)
			const response = await getAllFriendsUsers(debouncedValue)
			setResults(response)
			return setLoading(false)
		})()
	},[debouncedValue])
	
	return <Searchbar 
	// onAddFriend={(id)=>sendFriendRequest(id,useUserInformationStore.getState()._id)}
	onAddFriend={(id)=>sendFriendRequest(id)} 
	data={results} isLoading={loading} onChangeValue={(val)=>setSearcbarValue(val)}/>
}