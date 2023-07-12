import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator, Button } from "@aws-amplify/ui-react"

function App({ signOut }) {

  return (
    <>
      <body>
        <section>
          <h2>Welcomet to the new authenticator!</h2>
          <Button onClick={signOut}> Sign out </Button>
        </section>
      </body>
    </>
  )
}

export default withAuthenticator(App)
