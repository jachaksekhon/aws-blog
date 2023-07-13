// import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator, Button } from "@aws-amplify/ui-react"
import { Routes, Route, Link } from 'react-router-dom'

import HomePage from "./HomePage"
import CreateBlog from "./CreateBlog"

function App() {


  return (
    <>
      <CreateBlog />
    </>
  )
}

export default withAuthenticator(App)
