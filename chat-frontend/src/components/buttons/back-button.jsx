"use client";
import {ArrowLongLeftIcon} from '@heroicons/react/24/outline'
import {Button} from "@/components/chakra-client/components"
import {useRouter} from "next/navigation"
export const BackButton = ({...props}) => {
  const router = useRouter()
  console.log(router.back)
  return <Button variant="unstyled" onClick={()=>router.back({shallow:false})}{...props}> 
  <ArrowLongLeftIcon style={{height:24,width:24}}/>
  </Button> 
}