import {getUserInformation} from "@/services/getUserInformation"
import UserInformationInitializer from "./_components/user-information-store-initializer"
import LayoutStore from "./_components/layout-store"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import SocketInitializer from "./_components/socket-initializer"

export default async function ChatLayout({children}){
    const promise = await getUserInformation()
    useUserInformationStore.setState({userInfo:promise})

    return <>
        <SocketInitializer />
        <UserInformationInitializer promise={promise}/>
        <LayoutStore>
            {children}
        </LayoutStore>
     
</>
}