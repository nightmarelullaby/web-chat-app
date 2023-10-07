"use client";
import {Button,VStack,HStack,Text,Avatar,AvatarBadge} from "@/components/chakra-client/components"


export const FriendDM = ({profileImage,isNew=false,username="Jeon Song",lastTimeActive="22:21 p.m",lastMessage="i want to fuck with you"}) => {
  return(
    <Button w="100%" bg="transparent" py="6" justifyContent="start" role="group" gap="3" px="2" alignItems="center" _hover={{bg:"gray.200"}}>
      <Avatar size="sm" src={profileImage}>
        <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='16px' />
      </Avatar>
      <VStack alignItems="start" gap="6px">
        <HStack justifyContent="space-between">
            <Text as="small" fontSize="16px" fontWeight="500" fontFamily="system-ui">{username}</Text>
            <Text as="small" color="gray.500" fontSize="12px" fontWeight="500" alignSelf="end" fontFamily="system-ui">{lastTimeActive}</Text>
        </HStack>
        <Text as="small" color="gray.600" fontFamily="system-ui">{lastMessage}</Text>
      </VStack>
      
         
       
      {isNew && <HStack ml="auto" justifyContent="center"  bg="#ff3333" borderRadius="100%" p="2" h="20px" w="20px">
        <Text as="small" fontSize="10px" color="white" fontWeight="600">
          1
        </Text>        
      </HStack>}
      
    </Button>)
}