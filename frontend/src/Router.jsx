import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import OutLet from './components/common/OutLet'

const router = createBrowserRouter([
  {
    path:"/",
    element:<OutLet/>,
    children:[
      {
        index:true,
        element:<Home/>
      }
    ]
  }
])

function Router() {
  return (
       <div className="w-screen min-h-screen flex flex-col bg-richblack-900 font-inter">
         <RouterProvider router={router}/>
       </div>
  )
}

export default Router