import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function OutLet() {
  return (
   <>
     <Header/>
     <Outlet/>
     
   </>
  )
}

export default OutLet