"use client";
import {useState} from "react"
import NotificationsDropdown,{NotificationElement} from "@/components/notifications-dropdown/notifications-dropdown.jsx"
import {updateFriendRequest} from "@/services/updateFriendRequest"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {UnorderedList,Divider} from "@/components/chakra-client/components"
export default function NotificationsWrapper(){
	const {username,friendRequests,_id} = useUserInformationStore()
	const notificationsLength = friendRequests.filter(notification => notification.from.username !== username).length
	return <NotificationsDropdown 
		bg="white" 
		notificationsLength={notificationsLength}
		ml="auto" 
		_hover={{bg:"gray.100"}}>
		<UnorderedList  m="0">
        {friendRequests.map((notification,index) => <>
        	{!notification.from.username === username && <NotificationElement 
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
              date={notification.date}/>}

          {index !== friendRequests.length && <Divider />}
          </>)}
      		</UnorderedList>
		</NotificationsDropdown>
}