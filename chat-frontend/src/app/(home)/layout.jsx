import {Box,Flex} from "@/components/chakra-client/components"
import Link from "next/link"
export default function HomeLayout({children}){
   return <><Box as="header" py="4">
                  <Flex as="nav" justifyContent="center" gap="4">
                    <Link href="/home">Home</Link>
                    <Link href="/auth/login">Login</Link>
                  </Flex>
                </Box>
                {children}
          </>
}
