import Image from 'next/image'
import {Flex,Box,Center,Img,HStack,Button,VStack,Text,Input,FormControl, FormLabel,InputGroup,InputRightElement} from "@/components/chakra-client/components"
import RegisterForm from "./components/RegisterForm"
import Link from "next/link" 
import {BackButton} from "@/components/buttons/back-button"
import {ChatBubbleLeftRightIcon,ArrowLongLeftIcon} from '@heroicons/react/24/outline'

const Login = () => {
  const show = false
  return (
    <Flex gap="0">
    <Box flexGrow={{base:"1",sm:"1",md:"1",lg:".3"}} bg="gray.50" h="100vh">
    
      <VStack alignItems="stretch"  overflowY="scroll" h="100%" justifyContent="stretch" bg="white" p={{base:"0",sm:"0",md:"0",lg:"4"}} transition="0s" borderWidth={{base:"0px",sm:"0px",md:"1px"}}borderRadius="0px" >
      <VStack alignItems="start" gap="0">

       
      </VStack>
      <Box  overflowY="scroll"  p="4" w="100%">
      <Flex overflowY="scroll" gap={0} display={{base:"flex",sm:"flex",md:"flex",lg:"none"}} direction="column" mb="4">
        <BackButton />
         <Text as="h4" textAlign={{base:"start",sm:"start",md:"center",lg:"center"}}  color="cyan.800" textAlign={{base:"start",sm:"start",md:"center",lg:"center"}} fontSize="2xl" fontWeight="700">
          Sign up
        </Text>
        <Text as="p" textAlign={{base:"start",sm:"start",md:"center",lg:"center"}} color="cyan.900" fontSize="md" fontWeight="300">
          Register now and start chatting with all your people
        </Text>
        <Img alignSelf={{base:"start",sm:"start",md:"center",lg:"center"}} pointerEvents="none" objectFit="cover" h={{base:"180px",sm:"240px",md:"280px"}} w={{base:"180px",sm:"240px",md:"280px"}} userSelect="none" src="/images/sammy-team-marketing.png" />
        </Flex>
        <RegisterForm />
            <HStack  mt="2">
              <Text as="p" fontSize="sm">Already a member?</Text>
          <Link as={Link}  href="/auth/login">
            <Text as="p" fontSize="sm" color="purple.500" fontWeight="600" letterSpacing=".4px">
              Log in  
            </Text>
          </Link>
          </HStack>
      </Box>
      </VStack>
    </Box>
    <Box display={{base:"none",sm:"none",md:"none",lg:"block"}} bg="cyan.50" flexGrow=".7" >
    <Flex alignItems="center" direction="column" justifyContent="center" h="100%">
     <Text as="h4" color="cyan.800" fontSize="3xl" fontWeight="700">
          Sign up
        </Text>
        <Text as="p" color="cyan.900" fontSize="lg" fontWeight="300">
          Register now and start chatting with all your people
        </Text>
      <Img  objectFit="cover" pointerEvents="none" userSelect="none" src="/images/sammy-team-marketing.png" />
      </Flex>
    </Box>
    </Flex>
  )
}

export default Login
