import {Flex} from "@/components/chakra-client/components"
import {ChatMessage} from "../../_components/chat-message"
import moment from "moment"
import {useChatScroll} from "@/hooks/useChatScroll"
  
export default function ChatMessagesRender({username,currentMessages}){
  const ref = useChatScroll(currentMessages)
  console.log(currentMessages)
  return <Flex ref={ref} direction="column" height="100%" p="4" gap="4" bg="white" mt="auto" overflowY="scroll">
        {Array.isArray(currentMessages) && currentMessages.map(message => <ChatMessage images={message?.images} profileImage={process.env.NEXT_PUBLIC_IMAGES_API+message.authorId.profileImage} sender={message.username === username ? true: false} content={message.content} date={moment(message.date).calendar()} author={message.username}/>)}
      </Flex>
}

      