"use client" 
import {ChatMessage} from "../../_components/chat-message"
import {ChatInput} from "../../_components/chat-input"
import {Box,Flex} from "@/components/chakra-client/components"
import {useEffect,useState} from "react"
import {ChatContainerHeader } from "../../_components/chat-container"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {useCurrentMessages} from "@/store/useCurrentMessages"
import {useChatScroll} from "@/hooks/useChatScroll"
import moment from "moment"
import { uploadImage } from "@/services/uploadImage"

export default function ChatHandler({response,id}){
	const [currentMessages,setCurrentMessages] = useState(response.messages)	
	const ref = useChatScroll(currentMessages)
	const {currentSocket} = useSocketStore()
	const {_id,friendRequests,username} = useUserInformationStore()
	const headerUserTitle = response.users.filter(user => user.username !== friendRequests)[0].username
	const headerUserStatus = response.users.filter(user => user.username !== username)[0].status

	const handleAddMessages = (newMessage) => {
			return setCurrentMessages(prev => [...prev,newMessage])
	}
	useEffect(() => {
		if(!currentSocket) return
			currentSocket.on("server:added-message",handleAddMessages)
			return () => {
				currentSocket.off("server:added-message",handleAddMessages)
			}
	},[currentSocket])

	const handleSubmit = async (values,actions) => {
		const {input,image} = values

		const formData = new FormData()
		formData.append("image",image)

		const uploadImageResponse = await uploadImage(formData)
		console.log(uploadImageResponse)
		
		if(input === "" && image.length === 0) return;
		let bodyContent = {
			authorId:_id,
			content:input,
			username,
			chatId:response._id,
			images:[]
		}
		currentSocket.emit("client:add-message",bodyContent)
		return actions.resetForm()
	}

	return 		  <>  <Flex height="100%" direction="column">
      <ChatContainerHeader status={headerUserStatus} title={headerUserTitle} />
      <Flex ref={ref} direction="column" height="100%" p="4" gap="4" bg="white" mt="auto" overflowY="scroll">
      {console.log(currentMessages)}
        {Array.isArray(currentMessages) && currentMessages.map(message => <ChatMessage images={message?.images} sender={message.username === username ? true: false} content={message.content} date={moment(message.date).calendar()} author={message.username}/>)}
      
      </Flex>

       <ChatInput onSubmit={handleSubmit}/>
      </Flex>
   </>
}