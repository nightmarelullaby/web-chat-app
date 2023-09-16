import {getUserInformation} from "@/services/getUserInformation"
import UserInformationInitializer from "./_components/user-information-store-initializer"
import LayoutStore from "./_components/layout-store"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import SocketInitializer from "./_components/socket-initializer"
import dynamic from 'next/dynamic'
const DynamicSocketInitializer = dynamic(() => import("./_components/socket-initializer"), {
  ssr:false
})

import LayoutChatEvents from "./_components/layout-chat-events"
const URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND


export default async function ChatLayout({children}){
    const promise = await getUserInformation()
    useUserInformationStore.setState({promise})

    return <>
        <LayoutChatEvents/>
        <DynamicSocketInitializer URL={URL} userId={promise._id} />
        <UserInformationInitializer promise={promise}/>
        <LayoutStore>
            {children}
        </LayoutStore>
     
</>
}