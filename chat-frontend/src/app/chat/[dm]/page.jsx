import { ChatContainer } from "../_components/chat-container"

import ChatHandler from "./_components/chat-handler"
import {getChatById} from "@/services/getChatById"
import {useUserInformationStore} from "@/store/useUserInformationStore"

const dm = async ({params}) =>{
  const response = await getChatById(params.dm)
  const [result] = response.users.filter(user => user.username !== useUserInformationStore.getState().userInfo.username)

	return <ChatContainer>
            <ChatHandler response={response} id={params.dm} headerTitle={result.username}/>
	       </ChatContainer>
}
export default dm