import Image from 'next/image'
import {Flex,Box,Img,Center,HStack,VStack,Button,Text,Input,FormControl, FormLabel,InputGroup,InputRightElement} from "@/components/chakra-client/components"
import LoginForm from "./components/LoginForm"
import Link from "next/link" 
const Login = () => {
  return (   
    <Flex justifyContent="stretch">
    <Box p="32px" position="relative" flexGrow=".8" display={{base:"none",sm:"none",md:"none",lg:"block"}}>
      <Text  as="h4" textAlign="center" color="gray.700" fontSize="3xl" fontWeight="700">
          Login to your account
        </Text>
        <Text as="p" textAlign="center"  color="gray.500" fontSize="lg" fontWeight="300">
          Please login to access to your chats
        </Text>
         <Img display={{sm:"none",md:"block"}} position="absolute" zIndex="-1" top="200px" left="-5%" objectFit="cover" h="547px" w="316px" src="/images/girl-jumping.png" />
         <Img display={{sm:"none",md:"block"}} position="absolute" zIndex="-1" right="-20px" objectFit="cover" h="350px" w="273px" src="/images/sammy-line-seated-man-in-slippers.png" />
    </Box>
    <Box alignSelf="end" flexGrow={{base:"1",sm:"1",md:"1",lg:".2" }} width={{base:"100%",sm:"100%",md:"100%",lg:"inherit" }}  bg="transparent" zIndex="1" h="100vh" >
      <VStack m="0" position="relative"  alignItems="end" minW={[200,500]}  h="100%" justifyContent="center" bg="white" p="4" transition="0s" borderLeftWidth={{base:"none",sm:"none",md:"1px"}} >
      
      <VStack alignItems="start" ml="4" gap="0">
        
      </VStack>
      <Img visibility={{base:"visible",sm:"visible",md:"visible",lg:"hidden"}} position="absolute" zIndex="1" top="0px" left="-20px" objectFit="cover" h="181px" w="106px" src="/images/girl-jumping.png" />
      <Box w="100%">
         
      

      <Box display={{base:"block",sm:"block",md:"block",lg:"none"}} p="32px" position="relative">
    
              <Text lineHeight="28px" as="h4" textAlign="center" color="gray.700" fontSize="3xl" fontWeight="700">
                  Login to your account
                </Text>
                <Text as="p" textAlign="center"  color="gray.500" fontSize="lg" fontWeight="300">
                  Please login to access to your chats
                </Text>
              
            </Box>
        <LoginForm />
            <HStack ml="4" mt="2">
              <Text as="p" fontWeight="500" fontSize="sm">Don't have an account?</Text>
          <Link as={Link}  href="/auth/register">
            <Text as="p" fontSize="sm" color="purple.500" fontWeight="600" letterSpacing=".4px">
              Sign in
            </Text>
          </Link>
          </HStack>
      </Box>
      <Img  visibility={{base:"visible",sm:"visible",md:"visible",lg:"hidden"}}  position="absolute" zIndex="1" right="-15px" bottom="-50px" objectFit="cover" h="150px" w="119px" src="/images/sammy-line-seated-man-in-slippers.png" />
      </VStack>
      
    </Box>
    </Flex>
  )
}

export default Login
