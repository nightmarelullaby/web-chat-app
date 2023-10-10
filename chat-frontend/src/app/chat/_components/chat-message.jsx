"use client";
import {IconDots,} from '@tabler/icons-react';
import {useMemo} from "react"
import {Grid,GridItem,Box,HStack,Img,Text,Flex,Avatar} from "@/components/chakra-client/components"

export const ChatMessage = ({profileImage,author,content,sender,date,images=[],sendingMessage}) =>  {
  console.log(profileImage)
  return <>{!sender && (<HStack alignItems="start">
          <Avatar size="sm" src={profileImage} />

          <Flex gap="1" direction="column">
          <HStack alignItems="end">
            <Text as="span" fontSize="14px" fontWeight="500" fontFamily="system-ui">{author}</Text>
            <Text as="small" fontSize="12px" fontWeight="400"  color="gray.500" alignSelf="center" fontFamily="system-ui">{date}</Text>
          </HStack>
          <Box>
          
          <Box bg="orange.100" display="flex" flexDirection="column" borderRadius="8" borderTopLeftRadius="0" p="2">
            <Grid templateColumns={`repeat(${images.length}, 1fr)`} gap={2}>
              {images.map(image => <Img key={image} h="100px" h="100px" objectFit="cover" src={image} /> )}
            </Grid>
            <Text as="p" display="inline-block" fontFamily="system-ui" fontSize="14px" fontWeight="600">
              {content}
            </Text>
          </Box>
          </Box>
          
          </Flex>
          <Box alignSelf="center" cursor="pointer" bg="gray.200" _hover={{bg:"gray.300"}} borderRadius="100%" p="1" boxSizing="border-box">
          <IconDots 
            size={16} 
            marginLeft="0"
            stroke={2}
            strokeLinejoin="bevel"
          />
          </Box>
  </HStack>)}
  {sender && (<HStack alignItems="start" justifyContent="end">
                    <Box alignSelf="center" cursor="pointer" bg="gray.200" _hover={{bg:"gray.300"}} borderRadius="100%" p="1" boxSizing="border-box">
          <IconDots 
            size={16} 
            marginLeft="0"
            stroke={2}
            strokeLinejoin="bevel"
          />
          </Box>

          <Flex gap="1" direction="column">
          <HStack alignItems="end">
            <Text as="small" fontSize="12px" fontWeight="400" color="gray.500" alignSelf="center" fontFamily="system-ui">{date}</Text>
            <Text as="span" fontSize="14px" fontWeight="500" fontFamily="system-ui">{author}</Text>
          </HStack>
          <Box>
          
          <Box bg="orange.100" display="flex" flexDirection="column" justifyContent="end" borderRadius="8" borderTopRightRadius="0" p="2">
          <Grid templateColumns={`repeat(${images.length}, 1fr)`} gap={2} mr="auto">
            {images.map(image => <Img key={image} h="100px" h="100px" objectFit="cover" src={image} /> )}
          </Grid>
            <Text as="p" display="inline-block" fontFamily="system-ui" fontSize="14px" fontWeight="600">
              {content}
            </Text>
          </Box>
          </Box>
          </Flex>

          <Avatar size="sm" src={profileImage} />
  </HStack>)}
</>
}