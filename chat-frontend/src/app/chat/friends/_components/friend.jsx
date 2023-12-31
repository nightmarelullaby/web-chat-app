"use client";
import {IconMoonFilled,IconMessage,IconLogout,IconCheck,IconPointFilled,IconMoon,IconSearch,IconPlus,IconMoodHappy,IconDots,IconBrandTelegram,IconPaperclip,IconUserPlus,IconBell,IconDotsVertical,IconLetterA,IconCommand} from '@tabler/icons-react';
import Image from 'next/image'
import {Button,Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,Badge,InputGroup,InputLeftElement,InputRightElement,Grid,Box,GridItem,Input,VStack,HStack,Center,Text,Flex,Avatar,AvatarBadge} from "@/components/chakra-client/components"
import { BellIcon } from '@heroicons/react/24/outline'
import {useState,useRef,useEffect} from "react"
import {socket} from "@/socket"
import { useOutsideClick } from '@chakra-ui/react'


export const Friend = ({onOpenChat,isNew=false,username="Jeon Song",lastTimeActive="22:21 p.m",status="i want to fuck with you"}) => {
  return(
    <Flex cursor="pointer" role="group" gap="3" p="1" px="2" alignItems="center" _hover={{bg:"gray.100"}}>
      <Avatar size="sm" src="data:image/jpeg;base64,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">
        <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='16px' />
      </Avatar>
      <VStack alignItems="start" gap="0">
        <HStack justifyContent="space-between">
            <Text as="span" fontSize="16px" fontWeight="600" fontFamily="system-ui">{username}</Text>
        </HStack>
        <Text as="small" color="gray.500" fontFamily="system-ui">{status}</Text>
      </VStack>
   
      
   
       <Button onClick={onOpenChat} ml="auto" _groupHover={{outlineColor:"gray.400"}} variant="icon-outline">
          <IconMessage 
            size={18} 
            color="#2d3748"
            stroke={2.2}
            strokeLinejoin="miter"
          />
       </Button>
   
        

   
     <Popover placement="left-start">
      
     <PopoverTrigger>
       <Button  _groupHover={{outlineColor:"gray.400"}} variant="icon-outline">
          <IconDots 
            size={18} 
            color="#2d3748"
            stroke={2.2}
            strokeLinejoin="miter"
          />
       </Button>
       </PopoverTrigger>
         <PopoverContent>
    <PopoverHeader>Actions</PopoverHeader>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverBody>
      Delete friend
    </PopoverBody>
  </PopoverContent>
        

    
    </Popover>
         
       
      {isNew && <HStack ml="auto" justifyContent="center"  bg="#ff3333" borderRadius="100%" p="2" h="20px" w="20px">
        <Text as="small" fontSize="10px" color="white" fontWeight="600">
          1
        </Text>        
      </HStack>}
      
    </Flex>)
}