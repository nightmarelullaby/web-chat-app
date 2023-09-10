"use client";
import {IconMoonFilled,IconLogout,IconCheck,IconPointFilled,IconMoon,IconSearch,IconPlus,IconMoodHappy,IconDots,IconBrandTelegram,IconPaperclip,IconUserPlus,IconBell,IconDotsVertical,IconLetterA,IconCommand} from '@tabler/icons-react';
import Image from 'next/image'
import {Button,Popover,
  PopoverTrigger,
  Skeleton, SkeletonCircle,
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

export const Searchbar = ({isLoading=false,onAddFriend=()=>null,onChangeValue=()=>null,data=[]}) =>{
  const [isOpen,setIsOpen] =  useState(false)
  const [innerValue,setInnerValue] = useState("")
  const inputWraperRef = useRef()
  useEffect(() =>{
    onChangeValue(innerValue)
  },[innerValue])
  useOutsideClick({
    ref: inputWraperRef,
    handler: () => setIsOpen(false),
  })
  return <Box borderRadius="2" onClick={()=>setIsOpen(true)} ref={inputWraperRef} position="relative" zIndex="9999">
  <InputGroup fontFamily="system-ui" bg="white">
  <InputLeftElement left="1">
  <IconSearch 
    size={18} 
    stroke={2}
    strokeLinejoin="miter"
  />
  </InputLeftElement>
    <Input value={innerValue} onChange={({target:{value}}) => setInnerValue(value) } pl="10" transition=".15s ease" fontSize="sm" borderRadius={isOpen ? "6px 6px 0px 0px" : 6}  _focus={{borderColor:"gray.300",boxShadow:"none",borderBottomLeftRadius:isOpen ? 0 : 10,borderBottomRightRadius:isOpen ? 0 : 10}}borderColor={isOpen? "gray.300": "gray.200"} color="gray.800" fontWeight="500" _placeholder={{color:"gray.500",fontWeight:400}} placeholder="Search for people, groups..."type="text" />
  <InputRightElement right="28px"
      >
      <Box bg="gray.200" borderRadius="6" p="1" outlineWidth="1px" outlineStyle="solid" outlineColor="red" >
    <IconCommand 
      size={16} 
      color="#2d3748"
      stroke={2}
      strokeLinejoin="bevel"/>
      </Box>

    </InputRightElement>
    <InputRightElement 
      >
      <Box bg="gray.200" outlineColor="gray.200" outlineStyle="solid" outlineWidth=".5px" borderRadius="6" p="1" boxSizing="border-box">
    <IconLetterA
      size={16} 
      color="#2d3748"
      stroke={2}
      strokeLinejoin="miter"/>
      </Box>

    </InputRightElement>
  </InputGroup>
  <Box boxShadow={isOpen ? "xl": "sm"}  borderRadius="8" borderTopLeftRadius="0" borderTopRightRadius="0" bg="white" borderColor="gray.300" borderWidth=".5px" borderTopColor="transparent" display={isOpen ? "block" : "none"} position="absolute" maxHeight="240px" width="100%">
    <Box mx="2" mb="2">
      <Text  ml="2" mt="2" fontFamily="system-ui" as="p" fontSize="14px" color="gray.700" fontWeight="400">
        People <Text as="strong">{Array.isArray(data) && data.length}</Text> 
      </Text>
      <Flex mt="4" direction="column" gap="2">
      {data.length === 0 && isLoading && <HStack ml="2">
        <SkeletonCircle size='6' />
        <Skeleton h="6" w="100%" />
      </HStack> }
      {Array.isArray(data) && data.map(friend => {
      return <HStack key={friend.id} p="2"  role="group" borderRadius="8" _hover={{bg:"gray.100", }}>
        <Avatar size="xs" />
          <Text as="p" fontSize="14px" color="gray.700" fontFamily="system-ui"  fontWeight="700">{friend.username}</Text>
           <Button onClick={()=>onAddFriend(friend._id)}ml="auto" _groupHover={{outlineColor:"gray.400"}} variant="icon-outline">
          <IconUserPlus 
            size={16} 
            color="#2d3748"
            stroke={2.6}
            hover={{color:"gray"}}
            strokeLinejoin="miter"
          />
          </Button>
             <Button _groupHover={{outlineColor:"gray.400"}} variant="icon-outline">
          <IconDotsVertical 
            size={16} 
            color="#2d3748"
            stroke={2.6}
            strokeLinejoin="miter"
          />
          </Button>  
      </HStack>  
      })}
      
      </Flex>
    </Box>
  </Box>
  
  </Box>
}