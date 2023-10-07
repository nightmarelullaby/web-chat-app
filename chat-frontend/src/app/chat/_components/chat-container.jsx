"use client";
import {Box,VStack,HStack,Text,Flex,Avatar,AvatarBadge} from "@/components/chakra-client/components"
export const ChatContainerHeader = ({title,subtitle,status,profileImage}) => {
  return  <Box as="header" borderBottomColor="gray.200" borderWidth="0 0 .5px 0" pb="2">
  <HStack pl="4" pt="2">
   <Avatar size="sm" src={profileImage} >
       <AvatarBadge borderColor={status === 'Idle' ? 'papayawhip' : status === "Active" ? 'green.50' : status === "Disconnected" ? 'gray.50' : null} bg={status === "Idle" ? 'tomato.500' : status === "Active" ? 'green.500' : status === "Disconnected" ? 'gray.500' : null} boxSize='16px' />
   </Avatar>
   <VStack gap="0" alignItems="start">
     <Text as="span" fontSize="14px"fontWeight={600} fontFamily="system-ui">{title}</Text>
     <Text as="small" fontSize="13px"fontWeight={400}  color="gray.500" fontFamily="system-ui">{subtitle}</Text>
   </VStack>
  </HStack>
</Box>
}
export const ChatContainer = ({children}) => {
  return (
    <Flex height="100%" direction="column" bg="gray.50"> 
      {children}
    </Flex>)
}