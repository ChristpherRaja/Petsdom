import { useQuery } from '@tanstack/react-query'
import { apiCall } from '../utils/apiCall'

const useFetch = (key,{url,params},options) => {
  return useQuery({
    queryKey:key,
    queryFn:()=>apiCall({url,params}),
    ...options
  })
}

export default useFetch;