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
import { Field, Form, Formik } from 'formik';
import { useOutsideClick } from '@chakra-ui/react'
 import * as Yup from 'yup';
 const InputSchema = Yup.object().shape({
    input:Yup.string()
      .min(1,"Too Short!")
      .max(100, 'Too Long!')
 });

export const ChatInput = ({onSubmit}) =>{
  return <Flex borderTopColor="gray.300" borderWidth=".5px 0 0 0 " bg="gray.100" direction="column">
     <Formik 
          // onChange={(values)=>console.log(values)}
          validationSchema={InputSchema}
          initialValues={{input:''}}
          onSubmit={(values,actions)=>onSubmit(values,actions)}
        >
         {({values,handleSubmit}) => (

          <Form>
          <Field name="input" >
            {({ field, form}) => (
              <InputGroup> 
   <Input _hover={{borderColor:"transparent"}} fontFamily="system-ui" borderColor="transparent" _focus={{boxShadow:"none",borderColor:"transparent"}} _placeholder={{fontSize:14}} type="text" placeholder="Send message to" {...field}/>
   </InputGroup>
   )}
  
  </Field>
   <HStack my="2" mx="4">
      <Box  cursor="pointer" bg="gray.300" _hover={{bg:"gray.300"}} borderRadius="100%" p="1" boxSizing="border-box">
        <IconPlus 
          size={18} 
          stroke={2}
          strokeLinejoin="bevel"
        />
        </Box>
        <Box cursor="pointer" bg="gray.100" borderColor="gray.400" borderWidth=".5px" borderRadius="100%" p="1" boxSizing="border-box">
        <IconPaperclip 
          size={18} 
          stroke={2}
          strokeLinejoin="bevel"
        />
        </Box>
        <Box cursor="pointer" bg="gray.100" borderColor="gray.400" borderWidth=".5px" borderRadius="100%" p="1" boxSizing="border-box">
        <IconMoodHappy 
          size={18} 
          stroke={2}
          strokeLinejoin="bevel"
        />
        </Box>
        <Button 
          type="submit"
          bg="gray.800" 
          color="gray.100" 
          fontSize="13px"
          variant="unstyled"
          display="flex"
          justifyContent="center"
          alignItems="center"
          ml="auto"
          px="4"
          py="2"
          h="min-content"
          fontFamily="system-ui"
          rightIcon={
            <IconBrandTelegram 
              size={16} 
              marginLeft="0"
              stroke={2}
              strokeLinejoin="bevel"/>}>
          Send 
        </Button>
    </HStack>

    </Form>)}
    </Formik>
   </Flex>
}