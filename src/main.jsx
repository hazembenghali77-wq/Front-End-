import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./redux/store.js"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:5000/api"
createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </Provider>
  
)
