// import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator} from "@aws-amplify/ui-react"

import HomePage from "./HomePage"
import Header from "./Header"

function App() {


  return (
    
    <>
      <Header />
      <HomePage />
    </>
  )
}

export default withAuthenticator(App)
