"use client";
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  global:{
  	global:{
  		"*":{
  			padding:0,
  			margin:0,
  			boxSizing:"border-box"
  			
  		}
  	}
  },
  components:{
  	Input:{
  		variants:{
  			outline_black:{
  				field:
  			{
  				fontSize:"sm",
  				color:"gray.700",
  				fontFamily:"system-ui",
  				borderColor:"gray.400",
  				borderWidth:1,
  				focusBorderColor:"gray.600",
  				transition:".15s ease",
  				outlineOffset:"3px",
  				_focus:{outlineColor:"gray.300",outlineOffset:"3px",borderColor:"gray.600",boxShadow:"0 0 0 1px #4a5568"},
  				_invalid:{borderColor:"red.400",boxShadow:"0 0 0 1px #f56565"},
  				_placeholder:{fontFamily:"system-ui",fontSize:"sm" },
  			},
  			}
  		}
  	},
  	Button:{ 
  		variants:{
  			"icon-outline":{
  				display:"flex",
  				h:"min-content",
  				minW:"min-content",
  				alignItems:"center",
  				justifyContent:"center",
  				_hover:{bg:"gray.300"},
  				outline:".5px solid red", 
  				outlineColor:"gray.300",
  				cursor:"pointer",
  				bg:"transparent", 
  				borderRadius:"4",
  				p:"1"
  			}
  		}
  	}
  }
})
import { ChakraProvider } from '@chakra-ui/react'
export default function ChakraProviderLayout({children}){
	return<>
		<ChakraProvider theme={theme}>
			{children}
		</ChakraProvider>
	</>
}