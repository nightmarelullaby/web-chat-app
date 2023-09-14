import { ChatContainer } from "../_components/chat-container"

import ChatHandler from "./_components/chat-handler"
import {getChatById} from "@/services/getChatById"
import {useUserInformationStore} from "@/store/useUserInformationStore"

const dm = async ({params}) =>{
  const response = await getChatById(params.dm)
	return <ChatContainer>
            <ChatHandler response={response} id={params.dm}/>
	       </ChatContainer>
}
export default dm