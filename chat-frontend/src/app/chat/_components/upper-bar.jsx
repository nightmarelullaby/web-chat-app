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

export const UpperBar = ({children}) => {
  return <Flex as="header" alignItems="center">
  {children}
    
  </Flex> 
}