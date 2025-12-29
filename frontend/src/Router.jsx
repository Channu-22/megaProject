import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import OutLet from './components/common/OutLet'
import About from './pages/About'
import Contact from './pages/Contact'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path:"/",
    element:<OutLet/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
       {
        path:"/signup",
        element:<SignUp/>
      },
       {
        path:"/login",
        element:<Login/>
      },

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