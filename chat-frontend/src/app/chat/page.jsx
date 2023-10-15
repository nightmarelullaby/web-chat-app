import {Grid,Box,GridItem,Img,VStack,HStack,Center,Text,Flex} from "@/components/chakra-client/components"
import {socket} from "@/socket"
import { ChatContainer } from "./_components/chat-container"
async function Chat(){
  return <Box  h="100%" >
  <Flex h="100%" direction="column" justifyContent="center" alignItems="center">
  <Text as="h2" fontSize="4xl" fontWeight="600" color="gray.700">
    The chat is empty
  </Text>
  <Text as="p" fontWeight="400" color="gray.500">
    Start adding friends by searching 'em
  </Text>
  <Img mt="6" h="251px" w="203px" objectFit="cover" src="/images/sammy-line-businessman.png"/>
    </Flex>
  </Box>
}
export default Chat