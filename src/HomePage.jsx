import React from 'react'
import "@aws-amplify/ui-react/styles.css"
import { Button } from "@aws-amplify/ui-react"
import { Auth } from 'aws-amplify';

export const HomePage = () => {

    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
            }
    }

  return (
    <>
		<div>
            <h2>This is the new navpage!</h2>
            <Button onClick={ signOut }>Log Out</Button>
        </div>
    </> 
    
  )
}

export default HomePage