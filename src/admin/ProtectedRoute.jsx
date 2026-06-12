import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'  
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
const { isAuth, role } = useSelector(state => state.user)    

if(!isAuth) return <Navigate to="/" />
if(role !== "admin") return <Navigate to="/" />

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoute
