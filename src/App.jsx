// import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator} from "@aws-amplify/ui-react"
import { BlogProvider } from "./context/BlogContext"

import HomePage from "./HomePage"
import Header from "./Header"

function App() {


  return (
    <BlogProvider>
      <>
        <Header />
        <HomePage />
      </>
    </BlogProvider>
  )
}

export default withAuthenticator(App)
