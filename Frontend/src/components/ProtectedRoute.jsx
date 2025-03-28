import { Navigate, Outlet } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const ProtectedRoute = () => {

  const {data:isUserLogin,isLoading,error} = useFetch(['auth'],{url:'/auth/is-auth'}) 
   
  if(isLoading) return <h1>Loading...</h1>

  if(error) return <h1>Something went wrong!</h1>

  return isUserLogin?.success ? <Outlet/> : <Navigate to={'/login'} replace/>
}

export default ProtectedRoute