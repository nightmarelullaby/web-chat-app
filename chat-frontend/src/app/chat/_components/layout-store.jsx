"use client";
import {Button,Tabs, TabList, TabPanels,Divider, Tab, TabPanel,Grid,Box,GridItem,VStack,HStack,Center,Text,Flex} from "@/components/chakra-client/components"
import { UpperBar } from './upper-bar';
import {IconFriends} from '@tabler/icons-react';
import { Sidebar } from './sidebar';
import {useRouter} from "next/navigation"
import { ChatContainer } from './chat-container';
import Link from "next/link"
import SearchbarFetch from './searchbar-with-fetch'
import {FriendsList} from "./friend-list"
import UserDropdown from "@/components/user-dropdown/user-dropdown"
import NotificationsWrapper from "./notifications-wrapper"
import moment from "moment"
import {useSocketStore} from "@/store/useSocketStore"
import {useUserInformationStore} from "@/store/useUserInformationStore"
export default function LayoutStore({children}){
    const {currentSocket} = useSocketStore()
	const {userInfo} = useUserInformationStore()
    const chats = userInfo.chats.map((chat,index) => {
        let [users] = chat.users.filter(i => i._id !== userInfo._id)
        if(!users) return {
            lastMessage:{content:"",date:""},
            id:chat._id,
            username:users.username,
        }
        return { 
            lastMessage:{content:chat.messages[0]?.content,date:moment(new Date(chat.messages[0]?.date)).startOf('day').fromNow()},
            id:chat._id,
            username:users.username,
         }
    })
    const router = useRouter()
	return     <Grid height="100%" gridTemplateRows="auto 1fr" templateAreas={`"header header header header header header header"
    "sidebar main main main main main main"
    "sidebar main main main main main main"`}>
<GridItem bg="gray.50" position="relative" zIndex="9999999" borderBottomColor="gray.200" borderWidth="0 0 .5px 0" py="4" area={'header'} px="4">
<UpperBar  >
    <NotificationsWrapper />
    <UserDropdown status={userInfo.status} 
    onClickActive={()=>{
        let obj = {id:userInfo._id,status:"Active"}
        return currentSocket.emit("client:update-status",obj)
    }}
    onClickDisconnected={()=>{
        let obj = {id:userInfo._id,status:"Disconnected"}
        return currentSocket.emit("client:update-status",obj)
    }}
    onClickIdle={()=>{
        let obj = {id:userInfo._id,status:"Idle"}
        return currentSocket.emit("client:update-status",obj)}} username={userInfo?.username}/>
</UpperBar>
</GridItem>

<GridItem pt="4" area={'sidebar'} pl="4" pr="4">
<Sidebar>
    <SearchbarFetch/>
    <Link href="/chat/friends" style={{width:"100%"}}>
    <Button w="100%" bg={""}_hover={{bg:"gray.100"}}variant="icon-outline" justifyContent="start" pl="4" py="2" fontSize="14px" fontFamily="system-ui"
        leftIcon={<IconFriends 
            size={16} 
            color="#2d3748"
            stroke={2.0}
            strokeLinejoin="miter"/>}>
        Friends
    </Button>     
    </Link>
    <Divider mt="2"/>
    <Text as="h4" fontFamily="system-ui" fontSize="16px" color="gray.500"fontWeight="400">Chats</Text> 
    <FriendsList data={chats}/>    
</Sidebar>
</GridItem>

<GridItem borderColor="gray.200"  borderWidth="0  0 0 .5px" area={'main'}>
{children}
</GridItem>

</Grid>
}