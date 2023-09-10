"use client"
import {useState,useRef,useEffect} from "react"
import {useUserInformationStore} from "@/store/useUserInformationStore"
export default function UserInformationInitializer({promise}){
	const [data,setData] = useState()
	const [hasInitialized,setHasInitialized] = useState(false)

	useEffect(() => {
		if(hasInitialized) return
		(async () => {
			const response = await promise
			setData(response)
			useUserInformationStore.setState({userInfo:response})
			return setHasInitialized(true)
		})()
	},[])
	
	return null
}