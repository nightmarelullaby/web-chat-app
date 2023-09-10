import './globals.css'

import ChakraProviderLayout from "@/layouts/ChakraProviderLayout"
import { Inter } from 'next/font/google'
import { Inter_Tight } from 'next/font/google'
import Link from "next/link"

 import {Center,Box,Flex,Text,VStack,Button} from "@/components/chakra-client/components"
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: 'Home',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

          <body className={inter.className}>
          <main style={{height:"100%"}}>
              <ChakraProviderLayout>
                {children}
              </ChakraProviderLayout>
          </main>
          </body>
    </html>
  )
}
