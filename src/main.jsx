import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Amplify } from 'aws-amplify'
import config from "./aws-exports.js"
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './HomePage.jsx'
import CreateBlog from './CreateBlog.jsx'
import MyBlogs from './MyBlogs.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "createblog",
    element: <CreateBlog />
  },
  {
    path: "createblog",
    element: <CreateBlog />
  },
  {
    path: "myblogs",
    element: <MyBlogs />
  }
])

// configuring app to use AWS resources
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
