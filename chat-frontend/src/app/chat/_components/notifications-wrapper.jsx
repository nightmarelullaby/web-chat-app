"use client";
import NotificationsDropdown,{NotificationElement} from "@/components/notifications-dropdown/notifications-dropdown.jsx"
import {updateFriendRequest} from "@/services/updateFriendRequest"
import {useUserInformationStore} from "@/store/useUserInformationStore"
import {UnorderedList,Divider} from "@/components/chakra-client/components"
export default function NotificationsWrapper(){
	const {userInfo} = useUserInformationStore()
	const notifications = userInfo.friendRequests.filter(not => not.from.id !== userInfo._id)
	const notificationsLength = notifications.length
	return <NotificationsDropdown 
		bg="white" 
		notificationsLength={notificationsLength}
		ml="auto" 
		_hover={{bg:"gray.100"}}>
		<UnorderedList  m="0">
        {notifications.map((notification,index) => <>
          <NotificationElement 
          		onAccept={()=>updateFriendRequest("accept",notification._id,notification.from.id)}
          		onDeny={()=>updateFriendRequest("deny",notification._id,notification.from.id)}
              friendRequestId={notification._id} 
              id={notification._id} 
              type="friendRequest" 
              from={notification.from.username} 
              date={notification.date}/>
          {index !== userInfo.friendRequests.length && <Divider />}
          </>)}
      		</UnorderedList>
		</NotificationsDropdown>
}