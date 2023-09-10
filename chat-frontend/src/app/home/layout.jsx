import {Box,Flex} from "@/components/chakra-client/components"
import Link from "next/link"
export default function HomeLayout({children}){
   return <><Box as="header">
                  <Flex as="nav">
                    <Link href="/home">Home</Link>
                    <Link href="/auth/login">Login</Link>
                  </Flex>
                </Box>
                {children}
          </>
}
