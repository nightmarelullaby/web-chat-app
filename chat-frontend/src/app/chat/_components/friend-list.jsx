"use client";
import {IconMoonFilled,IconLogout,IconCheck,IconPointFilled,IconMoon,IconSearch,IconPlus,IconMoodHappy,IconDots,IconBrandTelegram,IconPaperclip,IconUserPlus,IconBell,IconDotsVertical,IconLetterA,IconCommand} from '@tabler/icons-react';
import Image from 'next/image'
import {FriendDM} from "./friend-dm"
import Link from "next/link";

import {Button,Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,Badge,InputGroup,InputLeftElement,InputRightElement,Grid,Box,GridItem,Input,VStack,HStack,Center,Text,Flex,Avatar,AvatarBadge} from "@/components/chakra-client/components"

export const FriendsList = ({data}) => {
  return <Box position="relative">

    {data.map(({username,id,lastMessage}) => <Link style={{display:"block"}}href={"/chat/" + id}>
        <FriendDM lastTimeActive={lastMessage.date} lastMessage={lastMessage.content} username={username}/>
      </Link>)}
    </Box>
}