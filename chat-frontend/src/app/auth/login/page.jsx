import Image from 'next/image'
import {Flex,Box,Center,HStack,VStack,Button,Text,Input,FormControl, FormLabel,InputGroup,InputRightElement} from "@/components/chakra-client/components"
import LoginForm from "./components/LoginForm"
import Link from "next/link" 
const Login = () => {
  return (
    <Flex bg="gray.50" h="100vh" justifyContent="center">
      <VStack alignItems="stretch" minW={[200,500]} maxW="700px" h="100%" justifyContent="center" bg="white" p="4" transition="0s" borderWidth="1px" borderRadius="6px" >
      <VStack alignItems="start" ml="4" gap="0">
        <Text fontFamily="system-ui" as="h4" color="gray.700" fontSize="3xl" fontWeight="700">
          Log in
        </Text>
        <Text as="p" fontFamily="system-ui"  color="gray.600" fontSize="lg" fontWeight="400">
          Enter your data to access
        </Text>
      </VStack>
      <Box w="100%" mt="4" >
        <LoginForm />
            <HStack ml="4" mt="2">
              <Text as="p" fontSize="sm">Dont have an account?</Text>
          <Link as={Link}  href="/auth/register">
            <Text as="p" fontSize="sm" color="purple.500" fontWeight="600" letterSpacing=".4px">
              Register
            </Text>
          </Link>
          </HStack>
      </Box>
      </VStack>
    </Flex>
  )
}

export default Login
