"use client";
import {FriendDM} from "./friend-dm"
import Link from "next/link";
import {Box} from "@/components/chakra-client/components"

export const FriendsList = ({data}) => {
  return <Box position="relative">

    {data?.map(({profileImage,username,id,lastMessage}) => <Link style={{display:"block"}}href={"/chat/" + id}>
        <FriendDM lastTimeActive={lastMessage.date} profileImage={"http://localhost:3001/api/image/"+profileImage} lastMessage={lastMessage.content} username={username}/>
      </Link>)}
    </Box>
}