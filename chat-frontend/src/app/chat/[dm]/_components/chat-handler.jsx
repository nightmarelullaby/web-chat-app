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

export default function ChatHandler({response,id}){
	const [currentMessages,setCurrentMessages] = useState(response.messages)	
	const ref = useChatScroll(currentMessages)
	const {currentSocket} = useSocketStore()
	const {userInfo} = useUserInformationStore()
	const headerUserTitle = response.users.filter(user => user.username !== userInfo.username)[0].username
	const headerUserStatus = response.users.filter(user => user.username !== userInfo.username)[0].status

	const handleAddMessages = (data) => {
			return setCurrentMessages(data.messages)
	}
	useEffect(() => {
		if(!currentSocket) return

			currentSocket.on("server:added-message",handleAddMessages)

			return () => {
				currentSocket.off("server:added-message",handleAddMessages)
			}
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
      <ChatContainerHeader status={headerUserStatus} title={headerUserTitle} />
      <Flex ref={ref} direction="column" height="100%" p="4" gap="4" bg="white" mt="auto" overflowY="scroll">
      {console.log(currentMessages)}
        {Array.isArray(currentMessages) && currentMessages.map(message => <ChatMessage sender={message.authorId === userInfo._id ? true: false} content={message.content} date={moment(message.date).calendar()} author={message.authorId.username}/>)}
      
      
      </Flex>
       <ChatInput onSubmit={handleSubmit}/>
      </Flex>
   </>
}