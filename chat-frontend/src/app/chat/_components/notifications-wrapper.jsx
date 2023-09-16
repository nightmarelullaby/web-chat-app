"use client";
import {useState} from "react"
import NotificationsDropdown,{NotificationElement} from "@/components/notifications-dropdown/notifications-dropdown.jsx"
import {updateFriendRequest} from "@/services/updateFriendRequest"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {UnorderedList,Divider} from "@/components/chakra-client/components"
export default function NotificationsWrapper(){
	const {friendRequests,_id} = useUserInformationStore()
	const [notifications,setNotifications] = useState(friendRequests.map(not => {
		return {_id:not._id,from:{username:not.from.username},date:not.date} }))
	const notificationsLength = notifications?.length
	return <NotificationsDropdown 
		bg="white" 
		notificationsLength={notificationsLength}
		ml="auto" 
		_hover={{bg:"gray.100"}}>
		<UnorderedList  m="0">
        {notifications?.map((notification,index) => <>
          <NotificationElement 
          		onAccept={async ()=> { 
          			try{
          				await updateFriendRequest("accept",notification._id,notification.from.id)
          				return setNotifications(prev => prev.filter(not => notification._id !== not._id))
          			}	
          			catch(error){
          				return;
          		}}}
          		onDeny={async ()=> { 
          			try{
          				await updateFriendRequest("deny",notification._id,notification.from.id)
          				return setNotifications(prev => prev.filter(not => notification._id !== not._id))
          			}	
          			catch(error){
          				return;
          		}}}
              friendRequestId={notification._id} 
              id={notification._id} 
              type="friendRequest" 
              from={notification.from.username} 
              date={notification.date}/>
          {index !== friendRequests.length && <Divider />}
          </>)}
      		</UnorderedList>
		</NotificationsDropdown>
}