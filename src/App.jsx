// import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator, Button } from "@aws-amplify/ui-react"
import { Auth } from 'aws-amplify'
import { Routes, Route, Link } from 'react-router-dom'

import HomePage from "./HomePage"
import CreateBlog from "./CreateBlog"

function App( {signOut} ) {


  return (
    
    <>
      <header>
        <Button className=" m-3"onClick={ signOut }>Log Out</Button>
        <Button>Create Post</Button>
      </header>
      <HomePage />
      {/* <CreateBlog /> */}
    </>
  )
}

export default withAuthenticator(App)
