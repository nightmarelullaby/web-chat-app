"use client"
import {useEffect} from "react"
import {useUserInformationStore} from "@/store/useUserInformationStore"
export default function UserInformationInitializer({promise}){
	useEffect(() => {
		(async () => {
			const response = await promise
			return useUserInformationStore.setState(response)
		})()
	},[])
	return null
}