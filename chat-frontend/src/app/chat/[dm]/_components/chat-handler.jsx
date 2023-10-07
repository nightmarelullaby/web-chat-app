"use client" 
import {ChatMessage} from "../../_components/chat-message"
import {ChatInput} from "../../_components/chat-input"
import {Flex} from "@/components/chakra-client/components"
import {useEffect,useState} from "react"
import {ChatContainerHeader } from "../../_components/chat-container"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {useCurrentMessages} from "@/store/useCurrentMessages";
import ChatMessagesRender from "./chat-messages-render"
import moment from "moment"
import { uploadImage } from "@/services/uploadImage"

export default function ChatHandler({response,id}){
	{/* --- Stores all messages --- */}	
	const [currentMessages,setCurrentMessages] = useState(response.messages)	
	{/* --- ------------------- --- */}	


	{/* --- Getting current socket --- */}	
	const {currentSocket} = useSocketStore()
	{/* --- ---------------------- --- */}	


	{/* --- Getting logged user info --- */}	
	const {_id,friendRequests,username} = useUserInformationStore()
	{/* --- ------------------------ --- */}	


	{/* --- Getting header chat info --- */}	
	console.log(response.users)
	const headerUserTitle = response.users.filter(user => user.username !== friendRequests)[0].username
	const headerUserStatus = response.users.filter(user => user.username !== username)[0].status
	const profileImage = response.users.filter(user => user.username !== username)[0].profileImage
	{/* --- ------------------------ --- */}	


{/* --- HANDLE ADD RECEIVED MESSAGES --- */}
	const handleAddMessages = (newMessage) => {
			return setCurrentMessages(prev => [...prev,newMessage])
	}
{/* --- ---------------------------- --- */}



	{/* --- HANDLE RECEIVE MESSAGES --- */}
	useEffect(() => {
		if(!currentSocket) return
			currentSocket.on("server:added-message",handleAddMessages)
			return () => {
				currentSocket.off("server:added-message",handleAddMessages)
			}
	},[currentSocket])
{/* --- ------------------------- --- */}


{/* --- HANDLE MESSAGE SUBMIT --- */}
	const handleSubmit = async (values,actions) => {
		const {input,image} = values
		if(input === "" && image.length === 0) return;
		let uploadImageResponse 
		let bodyContent
		if(image){
			let formData = new FormData()
			formData.append("image",image)
			uploadImageResponse = await uploadImage(formData)
			bodyContent = {
				authorId:_id,
				content:input,
				username,
				chatId:response._id,
				images:["http://localhost:3001/api/image/"+uploadImageResponse.message]
			}
		} else{
			bodyContent = {
					authorId:_id,
					content:input,
					username,
					chatId:response._id,
			}	
		}		
		currentSocket.emit("client:add-message",bodyContent)
		return actions.resetForm()
	}
{/* --- --------------------- --- */}


	return(
		<Flex height="100%" direction="column">
      <ChatContainerHeader status={headerUserStatus} profileImage={"http://localhost:3001/api/image/"+profileImage} title={headerUserTitle} />
      <ChatMessagesRender username={username} currentMessages={currentMessages}/>
      <ChatInput onSubmit={handleSubmit}/>
    </Flex> 
)}