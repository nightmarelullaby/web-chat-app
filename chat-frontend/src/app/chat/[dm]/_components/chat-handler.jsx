"use client" 
import {ChatMessage} from "../../_components/chat-message"
import {ChatInput} from "../../_components/chat-input"
import {Box,Flex} from "@/components/chakra-client/components"
import {useEffect,useState} from "react"
import {ChatContainerHeader } from "../../_components/chat-container"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {useCurrentMessages} from "@/store/useCurrentMessages"

export default function ChatHandler({headerTitle,response,id}){
	const [currentMessages,setCurrentMessages] = useState(response.messages)
	const {newMessage,setNewMessage} = useCurrentMessages()
	const {currentSocket} = useSocketStore()
	const {userInfo} = useUserInformationStore()
	useEffect(() => {
		if(Object.values(newMessage).length === 0 ) return;
		setCurrentMessages(newMessage.messages)
	},[newMessage])	

	useEffect(() => {
		if(!currentSocket) return
			currentSocket.on("server:added-message",(msg) => {
				console.log(msg)
			return setCurrentMessages(msg.messages)})
	},[currentSocket])

	const handleSubmit = (values,actions) => {
		const {input} = values
		if(input === "") return;
		let bodyContent = {authorId:userInfo._id,content:input,chatId:response._id}
		console.log(currentSocket,"so we emit the msg")
		currentSocket.emit("client:add-message",bodyContent)
		return actions.resetForm()
	}

	return 		  <>  <Flex height="100%" direction="column">
      <ChatContainerHeader title={headerTitle} />
      <Flex direction="column" height="100%" p="4" gap="4" bg="white" mt="auto" overflowY="scroll">
        {Array.isArray(currentMessages) && currentMessages.map(message => <ChatMessage sender={message.authorId === userInfo._id ? true: false} content={message.content} author={message.authorId.username}/>)}
      
      </Flex>
       <ChatInput onSubmit={handleSubmit}/>
      </Flex>
   </>
}