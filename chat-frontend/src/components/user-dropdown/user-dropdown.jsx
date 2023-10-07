"use client";
import {IconMoonFilled,IconLogout,IconCheck,IconPointFilled,IconMoon,IconSearch,IconPlus,IconMoodHappy,IconDots,IconBrandTelegram,IconPaperclip,IconUserPlus,IconBell,IconDotsVertical,IconLetterA,IconCommand} from '@tabler/icons-react';
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

export default function UserDropdown({profileImage,onAvatarClick,username,status,onClickIdle,onClickActive,onClickDisconnected,onLogout}){
  const imageInputRef = useRef()
  return <Popover placement="top-start">
      
     <PopoverTrigger>
    <Button align="center" h="min-content" variant="unstyled" ml="4">
    <Flex  gap="2">
   
      <Avatar size="sm" src={profileImage}>

        <AvatarBadge borderColor={status === 'Idle' ? 'papayawhip' : status === "Active" ? 'green.50' : status === "Disconnected" ? 'gray.50' : null} bg={status === "Idle" ? 'tomato.500' : status === "Active" ? 'green.500' : status === "Disconnected" ? 'gray.500' : null} boxSize='16px' />
      </Avatar>    
    </Flex>
    </Button>
    </PopoverTrigger>
     <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>        
        <HStack>
          <Input visibility="hidden" type="file" onChange={()=>onAvatarClick(imageInputRef.current.files[0])} position="absolute" pointerEvents="none" ref={imageInputRef}/>
          <Avatar cursor="pointer" onClick={()=>imageInputRef.current.click()} size="md" src={profileImage}/>
         <VStack gap="2" alignItems="start">

          <Text as="small" fontFamily="system-ui" fontWeight="500">{username}</Text>
          <Badge  colorScheme={status === "Idle" ? 'tomato.500' : status === "Active" ? 'green.500' : status === "Disconnected" ? 'gray.500' : null} fontSize="12px" borderRadius="4" textTransform="capitalize" fontFamily="system-ui">{status}</Badge>
          </VStack>
         </HStack>
            
        </PopoverHeader>
        <PopoverBody>
         <Text as="p" color="gray.600" fontSize="13px">
            Change status
          </Text>
          <VStack gap="2" mt="2" alignItems="start">
          <Button role="group" onClick={onClickIdle} h="min-content" w="100%" variant="unstyled"> 
          <HStack color="orange.500">
            <Badge colorScheme='orange' fontSize="12px" borderRadius="4" textTransform="capitalize" fontFamily="system-ui">Idle</Badge>
            <Box ml="auto" _groupHover={{opacity:1}} opacity={0}>
              <IconCheck 
                size={15} 
                stroke={2}
                strokeLinejoin="bevel"
                 />
                 </Box>
            </HStack>
            </Button>
             <Button onClick={onClickActive}role="group" h="min-content" w="100%" variant="unstyled">
            <HStack w="100%" color="green.500">
              <Badge colorScheme='green' fontSize="12px" borderRadius="4" textTransform="capitalize" fontFamily="system-ui">Active</Badge>
              <Box ml="auto" _groupHover={{opacity:1}} opacity={0}>
              <IconCheck 
                size={15} 
                stroke={2}
                strokeLinejoin="bevel"
                 />
                 </Box>
            </HStack>
            </Button>
             <Button role="group"onClick={onClickDisconnected} h="min-content" w="100%" variant="unstyled">
            <HStack w="100%" color="gray.500">
              <Badge colorScheme='gray' fontSize="12px" borderRadius="4" textTransform="capitalize" fontFamily="system-ui">Disconnected</Badge>
              <Box ml="auto" _groupHover={{opacity:1}} opacity={0}>
              <IconCheck 
                size={15} 
                stroke={2}
                strokeLinejoin="bevel"
                 />
                 </Box>
            </HStack>
            </Button>
            
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <Button color="red.800" w="100%" transition=".15s ease" h="min-content" py="2" bg="transparent" _hover={{bg:"red.50",outline:"1px solid red",outlineColor:"red.200",outlineOffset:"0px"}} fontFamily="system-ui" fontSize="13px" 
          rightIcon={<IconLogout size={18} />}>
            Log out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
}
