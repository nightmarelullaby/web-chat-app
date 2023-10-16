import Image from 'next/image'
import Link from "next/link"
import {Center,Flex,Text,VStack,Button,Img} from "@/components/chakra-client/components"
export default function Home() {
  return (
    <Center h="100vh">

    <VStack alignItems="center" px={{base:"8px",sm:"16px",md:0}}>
    <Img src="/images/sammy-line-man-receives-a-mail.png" objectFit="cover" h={{base:"230px",sm:"300px"}} w={{base:"230px",sm:"300px"}}/>
      <Text textAlign="center" fontSize={{base:"3xl",sm:"5xl",md:"5xl"}} as="h1" color="gray.800" letterSpacing="-.04em" fontWeight="700">
          The new way to connect with all your people
      </Text>
        <Text textAlign="center" fontSize="xl" as="p" color="gray.600" fontWeight="300">
          The new way to keep connected with your friends is here!
      </Text>
      <Link href="/auth/login" style={{alignSelf:"center"}}>
      <Flex gap={{base:"6px",sm:"6px",md:"2"}} direction={{base:"column",sm:"row"}}>
      <Button _hover={{bg:"cyan.700"}} bg="gray.800"  borderRadius="200px" borderTopRightRadius={{base:200,sm:"0" }} borderBottomRightRadius={{base:200,sm:"0" }}  py="6" px="8" fontWeight="500" letterSpacing=".4px" color="white" fontSize="sm">
        Register now for free!
      </Button>
       <Button  bg="white" borderWidth=".5px" borderColor="gray.400" borderRadius="200px" borderTopLeftRadius={{base:200,sm:"0" }} borderBottomLeftRadius={{base:200,sm:"0" }}py="6" px="8"  fontWeight="400" letterSpacing=".4px" color="gray.700" fontSize="sm">
        Sign in
      </Button>
      </Flex>
      </Link>
      </VStack>
    </Center>
  )
}
