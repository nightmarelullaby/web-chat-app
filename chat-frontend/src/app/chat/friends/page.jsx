import SearchbarFetch from '../_components/searchbar-with-fetch'
import {Button,Tabs, TabList, TabPanels,Divider, Tab, TabPanel,Grid,Box,GridItem,VStack,HStack,Center,Text,Flex} from "@/components/chakra-client/components"
import {useUserInformationStore} from "@/store/useUserInformationStore"

import FriendsList from "./_components/friends-list"
export default function FriendsPage(){
	return <Box as="section" p="4">
		<SearchbarFetch />
		<Text as="h3" fontSize="18px" fontFamily="system-ui" mb="2" fontWeight="400" color="gray.600" mt="4">Friends</Text>
		<Box>
			<Tabs  variant='unstyled'>
			
			  <TabList mb="2" gap="2"borderColor="transparent">
			    <Tab 
			     	_selected={{bg:"gray.800",color:"gray.50"}}
			    	borderRadius="4" 
			    	outline="1px solid red"
			    	outlineColor="gray.200"
			    	h="min-content" 
			    	as="small" 
			    	cursor="pointer"
			    	color="gray.700" 
			    	fontWeight="500" 
			    	fontSize="13px"
			    	letterSpacing=".5px"
			    	fontFamily="system-ui" 
			    	borderColor="transparent" border="none" borderColor="gray.100">
			    	All
			    </Tab>
			    <Tab 
			    _selected={{bg:"gray.800",color:"gray.50"}}
			    	borderRadius="4" 
			    	cursor="pointer"
			    	fontSize="13px"
			    	letterSpacing=".5px"
			    	outline="1px solid red"
			    	outlineColor="gray.200"
			    	h="min-content" 
			    	as="small" 
			    	color="gray.700" 
			    	fontWeight="500" 
			    	fontFamily="system-ui" 
			    	borderColor="transparent" border="none" borderColor="gray.100">Connected</Tab>
			  </TabList>
			
			  <TabPanels mt="2">
			    <TabPanel p="0">
			    
			    <FriendsList data={useUserInformationStore.getState().userInfo.friends}/>
			    </TabPanel>
			    <TabPanel>
			      <p>two!</p>
			    </TabPanel>
			  </TabPanels>
			</Tabs>
		</Box>
	</Box>
}