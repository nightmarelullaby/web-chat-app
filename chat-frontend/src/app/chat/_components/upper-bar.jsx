"use client";
import {Flex} from "@/components/chakra-client/components"
export const UpperBar = ({children}) => {
  return <Flex as="header" alignItems="center">
  {children}
    
  </Flex> 
}