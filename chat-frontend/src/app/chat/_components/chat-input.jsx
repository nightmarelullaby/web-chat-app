"use client";
import {IconPlus,IconMoodHappy,IconBrandTelegram,IconPaperclip} from '@tabler/icons-react';
import {Button,Skeleton,Img,InputGroup,Box,Input,HStack,Flex,FormLabel} from "@/components/chakra-client/components"
import { Field, Form, Formik } from 'formik';
import {useState,useRef,useEffect,lazy} from "react"
// import data from '@emoji-mart/data'
import dynamic from 'next/dynamic'
import convertToBase64 from "@/utils/convertToBase64"
import EmojiPicker from "@/lib/emoji-mart"

 import * as Yup from 'yup';
 const InputSchema = Yup.object().shape({
    input:Yup.string()
      .min(1,"Too Short!")
      .max(100, 'Too Long!')
 });

export const ChatInput = ({onSubmit,onClickEmoji}) =>{
  const [emojiData,setEmojiData] = useState()
  const [emojiPickerVisible,setEmojiPickerVisible] = useState(false)
  const [images,setImages] = useState([])
  const [imageLoading,setImageLoading] = useState(false)
  const imageInputRef = useRef()

  useEffect(()=>{
    (async () =>{
      try{
        const emojiURL = 'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
        const response = await fetch(emojiURL)
        const json = await response.json()
        console.log(json)
        return setEmojiData(json)  
      }catch(error){
        console.log("fetch data error",error.message)
      }
    })()
  },[])
  return <Flex borderTopColor="gray.300" borderWidth=".5px 0 0 0 " bg="gray.100" direction="column">
     <Formik 
          validationSchema={InputSchema}
          initialValues={{input:'',images:[]}}
          onSubmit={(values,actions)=>{
            onSubmit(values,actions,images)
            return setImages([])
          }}
        >
         {({values,handleSubmit,setFieldValue}) => (

          <Form>
            <HStack pl={images.length === 0 ? "" : "4"} pt={images.length === 0 ? "" : "4"}>
            {images.map((img,index) => <>
              <Img 
                  h="70px" 
                  w="70px" 
                  borderRadius="6px" 
                  src={img}/>
                  {index + 1 === images.length && imageLoading && <Skeleton borderRadius="6px" h="70px" w="70px"startColor='gray.300' endColor='gray.400'/>}
                  </>
              )}
            </HStack>
            <Field name="images" >
              {({ field, form}) => (
                <Input 
                visibility="hidden"
                position="absolute"
                top="0"
                left="0"
                pointerEvents="none"
                ref={imageInputRef}
                _hover={{borderColor:"transparent"}} 
                fontFamily="system-ui" 
                borderColor="transparent" 
                _focus={{boxShadow:"none",borderColor:"transparent"}} 
                _placeholder={{fontSize:14}} 
                type="file" 
                placeholder="Send message to" 
                onChange={async (e)=> {
                  console.log(e.target.files[0])
                  setImageLoading(true)
                  const image = await convertToBase64(e.target.files[0])
                  if(images.includes(image)) return setImageLoading(false)
                  form.setFieldValue("images",[values.images,image])
                  setImages(prev => prev.concat(image))
                  return setImageLoading(false)
                }}/>)}
            </Field>
          <Field name="input" >
            {({ field, form}) => (
              <InputGroup> 
   <Input autocomplete="off" _hover={{borderColor:"transparent"}} fontFamily="system-ui" borderColor="transparent" _focus={{boxShadow:"none",borderColor:"transparent"}} _placeholder={{fontSize:14}} type="text" placeholder="Send message to" {...field}/>
   </InputGroup>
   )}
  
  </Field>
   <HStack my="2" mx="4">
      <Box id="img-picker" as="button"  cursor="pointer" bg="gray.300" _hover={{bg:"gray.300"}} borderRadius="100%" p="1" boxSizing="border-box">
        <IconPlus 
          size={18} 
          stroke={2}
          strokeLinejoin="bevel"
        />
        </Box>
        <Box as="button" onClick={()=>imageInputRef.current.click()} cursor="pointer" bg="gray.100" borderColor="gray.400" borderWidth=".5px" borderRadius="100%" p="1" boxSizing="border-box">
        <IconPaperclip 
          size={18} 
          stroke={2}
          strokeLinejoin="bevel"
        />
        </Box>
        <Box position="relative">
        {emojiPickerVisible && <Box position="absolute" zIndex="100" bottom="40px" left="0">
          <EmojiPicker data={emojiData} emojiSize={24} onEmojiSelect={(e)=>{
              let sym = e.unified.split('-')
              let codesArray = []
              sym.forEach(el => codesArray.push('0x' + el))
              let emoji = String.fromCodePoint(...codesArray)
              return setFieldValue("input",values.input+ emoji)}}
           />
        </Box>}
        <Box as="button" onClick={(e)=> {
          e.preventDefault()
          return setEmojiPickerVisible(prev => !prev)
        }} 
        cursor="pointer" bg="gray.100" borderColor="gray.400" borderWidth=".5px" borderRadius="100%" p="1" boxSizing="border-box">

        <IconMoodHappy 
          size={18} 
          stroke={2}
          strokeLinejoin="bevel"
        />
        </Box>
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