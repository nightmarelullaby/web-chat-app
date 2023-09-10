import Image from 'next/image'
import {Box,Center,HStack,Button,VStack,Text,Input,FormControl, FormLabel,InputGroup,InputRightElement} from "@/components/chakra-client/components"
import RegisterForm from "./components/RegisterForm"
import Link from "next/link" 
import {BackButton} from "@/components/buttons/back-button"
import {ChatBubbleLeftRightIcon,ArrowLongLeftIcon} from '@heroicons/react/24/outline'

const Login = () => {
  const show = false
  return (
    <Box bg="gray.50" h="100vh">
      <VStack alignItems="stretch" maxW="700px" h="100%" justifyContent="center" bg="white" p="4" transition="0s" borderWidth="1px" borderRadius="6px" >
      <VStack alignItems="start" ml="4" gap="0">
      <BackButton />
      <ChatBubbleLeftRightIcon style={{height:24,width:24}}/>
        <Text fontFamily="system-ui" as="h4" color="gray.700" fontSize="3xl" fontWeight="700">
          Sign up
        </Text>
        <Text as="p" fontFamily="system-ui"  color="gray.600" fontSize="lg" fontWeight="400">
          Register now and start chatting with all your people
        </Text>
      </VStack>
      <Box w="100%" mt="4">
        <RegisterForm />
            <HStack ml="4" mt="2">
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
  )
}

export default Login
