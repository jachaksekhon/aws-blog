import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator, Button } from "@aws-amplify/ui-react"

import HomePage from "./HomePage"

function App() {

  return (
    <>
      <HomePage />
    </>
  )
}

export default withAuthenticator(App)
