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

export default function UserDropdown({username,status,onClickIdle,onClickActive,onClickDisconnected,onLogout}){

  return <Popover placement="top-start">
      
     <PopoverTrigger>
    <Button align="center" h="min-content" variant="unstyled" ml="4">
    <Flex  gap="2">
   
      <Avatar size="sm" src="data:image/jpeg;base64,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">
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
          <Avatar size="md" src="data:image/jpeg;base64,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"/>
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
