"use client";
import {FriendDM} from "./friend-dm"
import Link from "next/link";
import {Box} from "@/components/chakra-client/components"

export const FriendsList = ({data}) => {
  return <Box position="relative">

    {data?.map(({profileImage,username,id,lastMessage}) => <Link style={{display:"block"}}href={"/chat/" + id}>
        <FriendDM lastTimeActive={lastMessage.date} profileImage={process.env.NEXT_PUBLIC_IMAGES_API+profileImage} lastMessage={lastMessage.content} username={username}/>
      </Link>)}
    </Box>
}