"use client";
import {Flex} from "@/components/chakra-client/components"
export const Sidebar = ({children}) => {
  return <Flex direction="column" gap="2" as="nav">
  {children}    
  </Flex>
}