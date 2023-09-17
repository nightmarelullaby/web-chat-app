import Picker from '@emoji-mart/react'
import {Suspense,lazy} from "react"

const Picker = lazy(() => import("@emoji-mart/react"));
export default function EmojiPicker({...props}){
	  return  (<Suspense fallback={<></>}> 
	  	<Picker {...props}/>
            </Suspense>)
}