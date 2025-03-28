import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const AdminRoute = () => {

  const { data: user, isLoading, error } = useFetch(['user'], {url:'/user'});

  if(isLoading) return <h1>Loading...</h1>

  if(error) return <h1>Something went wrong!</h1>

  return user?.data?.role == "admin" ? <Outlet /> : <Navigate to={'/'} />
}

export default AdminRoute