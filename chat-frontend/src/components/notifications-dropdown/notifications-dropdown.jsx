"use client";
import {IconMoonFilled,IconX,IconLogout,IconCheck,IconPointFilled,IconMoon,IconSearch,IconPlus,IconMoodHappy,IconDots,IconBrandTelegram,IconPaperclip,IconUserPlus,IconBell,IconDotsVertical,IconLetterA,IconCommand} from '@tabler/icons-react';
import Image from 'next/image'
import {Button,Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,List,
  ListItem,
  ListIcon,Divider,
  OrderedList,
  UnorderedList,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,Badge,InputGroup,InputLeftElement,InputRightElement,Grid,Box,GridItem,Input,VStack,HStack,Center,Text,Flex,Avatar,AvatarBadge} from "@/components/chakra-client/components"
import { BellIcon } from '@heroicons/react/24/outline'
import {useState,useRef,useEffect} from "react"
import {socket} from "@/socket"
import { useOutsideClick } from '@chakra-ui/react'
import UserDropdown from "@/components/user-dropdown/user-dropdown"

export function NotificationElement({profileImage,onAccept,onDeny,type="",from="test",date="22-22-2010",friendRequestId}){
    const [isSending,setIsSending] = useState(false)
    return <ListItem listStyleType="none" p="0">
    <Button w="100%" borderRadius="0" justifyContent="start" h="min-content" _hover={{bg:"gray.100"}} bg="transparent" p="2">
    <HStack>
    <Avatar alignSelf="start" size="sm" src={profileImage} />
    <VStack alignItems="start" justifyContent="start">
    <VStack alignItems="start" gap="1">
      <Text as="span" fontFamily="system-ui"  fontSize="13px"><Text as="strong" >{from}</Text> te ha enviado una solicitud</Text>
      <Text as="small" fontWeight="300" fontSize="10px">{date}</Text>
      </VStack>
      <HStack>
      <Button isDisabled={isSending} onClick={async ()=>{
        setIsSending(true)
        await onAccept()
        return setIsSending(false)
      }} variant="icon-outline" >
        <IconCheck 
          size={16} 
          color="#2d3748"
          stroke={2.6}
          strokeLinejoin="miter"
        />
        <Text as="span" fontSize="12px" fontFamily="system-ui">Accept</Text>
      </Button>
      <Button isDisabled={isSending} onClick={async ()=>{
        setIsSending(true)
        await onDeny()
        return setIsSending(false)
      }}variant="icon-outline">
      <IconX 
          size={16} 
          color="#2d3748"
          stroke={2.6}
          strokeLinejoin="miter"
        />
        <Text as="span" fontSize="12px" fontFamily="system-ui">Deny</Text>
      </Button>
      </HStack>
      </VStack>
      </HStack>
      </Button>
    </ListItem>
}
export default function NotificationsDropdown({notificationsLength,data,onFriendAccept,onFriendDeny,children,...rest}){
	return  <Popover placement="bottom-start">
      
     <PopoverTrigger>
    
    <Button position="relative" _groupHover={{outlineColor:"gray.400"}} variant="icon-outline" {...rest}>
      <IconBell 
        size={20} 
        stroke={1.8}
        strokeLinejoin="bevel"
      />
      {notificationsLength > 0 && <Box bg="red.400" outline="2.3px solid red" outlineColor="white" bottom="-4px" left="-10px" h="4" w="4" display="flex" alignItems="center" justifyContent="center" borderRadius="32" position="absolute">
      <Text fontFamily="system-ui" fontSize="11px" fontWeight="700" as="small" color="white">
        {notificationsLength}
      </Text>
        
      </Box>}
      </Button>
      
     </PopoverTrigger>
    
  <PopoverContent>
    <PopoverHeader>Notifications</PopoverHeader>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverBody p="0">
      {children}
    </PopoverBody>
  </PopoverContent>
        

    
    </Popover>
}