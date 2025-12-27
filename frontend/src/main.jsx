// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import Router from './Router';
import {Provider } from "react-redux"
import store from "./redux/store.js"
import {Toaster} from "react-hot-toast"



createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <Router></Router>
      <Toaster/>

    </Provider>

)
