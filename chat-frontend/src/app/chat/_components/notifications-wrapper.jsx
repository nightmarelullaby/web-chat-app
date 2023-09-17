"use client";
import {useState,useEffect} from "react"
import NotificationsDropdown,{NotificationElement} from "@/components/notifications-dropdown/notifications-dropdown.jsx"
import {updateFriendRequest} from "@/services/updateFriendRequest"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {UnorderedList,Divider} from "@/components/chakra-client/components"
export default function NotificationsWrapper(){
	const {username,friendRequests,_id} = useUserInformationStore()
	const [friendRequestsFiltered,setFriendRequestsFiltered] = useState(friendRequests.filter(notification => notification.from.username !== username))
	const notificationsLength = friendRequestsFiltered.length
	useEffect(()=>{
		console.log(friendRequests)
		setFriendRequestsFiltered(friendRequests.filter(notification => notification.from.username !== username))
	},[friendRequests])

	return <NotificationsDropdown 
		bg="white" 
		notificationsLength={notificationsLength}
		ml="auto" 
		_hover={{bg:"gray.100"}}>
		<UnorderedList  m="0">
        {friendRequestsFiltered.map((notification,index) => <>
        	<NotificationElement 
          		onAccept={async ()=> { 
          			try{
          				const updateResponse = await updateFriendRequest("accept",notification._id,notification.from.id)
          				console.log(updateResponse)
          				return setFriendRequestsFiltered(friendRequestsFiltered.filter(not => notification._id !== not._id))
          			}	
          			catch(error){
          				return;
          		}}}
          		onDeny={async ()=> { 
          			try{
          				await updateFriendRequest("deny",notification._id,notification.from.id)
          				return setFriendRequestsFiltered(friendRequestsFiltered.filter(not => notification._id !== not._id))
          			}	
          			catch(error){
          				return;
          		}}}
              friendRequestId={notification._id} 
              id={notification._id} 
              type="friendRequest" 
              from={notification.from.username} 
              date={notification.date}/>
          {index !== notificationsLength && <Divider />}
          </>)}
      		</UnorderedList>
		</NotificationsDropdown>
}