const URL = "https://chat-backend-r4ns.onrender.com"
import SocketRoomEvents from "./_components/socket-events-room"
import { useUserInformationStore } from "@/store/useUserInformationStore"
console.log(useUserInformationStore.getState().userInfo)
export default function DmLayout({children,params}){
	return <>
		<SocketRoomEvents url={URL} chatId={params.dm}id={useUserInformationStore.getState().userInfo._id}/>
		{children}
		</>
}