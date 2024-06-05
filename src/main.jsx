import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { Amplify } from 'aws-amplify'
import config from "./aws-exports.js"

import CreateBlog from './components/CreateBlog.jsx'
import MyBlogs from './components/MyBlogs.jsx'
import BlogReadMore from './components/BlogReadMore.jsx'
import EditBlog from './components/EditBlog.jsx'

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
    path: "myblogs",
    element: <MyBlogs />
  },
  {
    path: "blog/:id",
    element: <BlogReadMore />
  },
  {
    path: "editblog/:id",
    element: <EditBlog />
  }
  
])

// configuring app to use AWS resources
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
