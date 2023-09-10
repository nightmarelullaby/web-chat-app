import {useEffect,useState} from "react"
const useFetch = (URL,options) => {
  const [data,setData] = useState(null)
  const [isFetching,setIsFetching] = useState(false)
  const [error,setError] = useState()



  useEffect(() => {
	const controller = new AbortController()
  	const { signal } = controller
  	options.signal = signal
  	(async () => {
  		try{
  			setIsFetching(true)
  			const response = await fetch(URL,options)	

  			if(response.status !== 200) {
  				const {error_message} = response
  				return setError(error_message)
  			}

  			const jsonData = await response.json()
  			setData(jsonData)
  			return setIsFetching(false);
  		}catch(error){
  			return setError(error.message)
  		}
  	})()
  	return () => controller.abort()
  },[])

  return [data,isFetching,error]
}