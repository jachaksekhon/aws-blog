import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator, Button, Heading, View, Card } from "@aws-amplify/ui-react"

function App({ signOut }) {

  return (
    <>
      <View>
        <Card>
          <Heading level={1}> We now have auth! </Heading>
        </Card>
        <Button onClick={signOut}> Sign out </Button>
      </View>
    </>
  )
}

export default withAuthenticator(App)
