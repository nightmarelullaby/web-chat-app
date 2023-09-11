const URL = "https://chat-backend-r4ns.onrender.com"
import SocketInitializer from "./_components/socket-initializer-room"
import { useUserInformationStore } from "@/store/useUserInformationStore"
export default function DmLayout({children,params}){
	console.log(params)
	return <>
		<SocketInitializer url={URL} chatId={params.dm}id={useUserInformationStore.getState().userInfo._id}/>
		{children}
		</>
}