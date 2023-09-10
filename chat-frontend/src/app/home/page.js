import Image from 'next/image'
import Link from "next/link"
import {Center,Text,VStack,Button} from "@/components/chakra-client/components"
export default function Home() {
  return (
    <Center h="100vh">
    <VStack gap="0" alignItems="stretch">
      <Text fontSize="6xl" as="h1" fontFamily="system-ui"color="gray.800" letterSpacing="-.04em" fontWeight="700">
          Fast, flexible and secure
      </Text>
        <Text textAlign="center" fontSize="xl" as="p" color="gray.600" fontWeight="500">
          The new way to keep connected with your friends is here
      </Text>
      <Link href="/auth/login" style={{alignSelf:"center"}}>
      <Button  py="6" px="8" fontFamily="system-ui" mt="4" bg="gray.50" borderColor="gray.300" transition="0s" borderWidth="1px" fontWeight="600" letterSpacing=".4px" color="gray.700" fontSize="md">
        Register now for free!
      </Button>
      </Link>
      </VStack>
    </Center>
  )
}
