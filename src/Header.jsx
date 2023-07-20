import React from 'react'
import logo from './assets/blogrLeft.png'
import headerLogo from './assets/headerLogo.png'

import { Flex, Image, Button, View, ThemeProvider } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { Link, useNavigate } from 'react-router-dom'

import CreateBlog from './CreateBlog'




const Header = ( ) => {

    const navigateTo = useNavigate();

    async function signOut() {
        try {
          await Auth.signOut();
          navigateTo('/')
        } catch (error) {
          console.log('error signing out: ', error);
        }
      }


    return (
      <header
        style={{
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: "10%",
          marginRight: "5%"
        }}
      >
        <Link to="/">
          <Image
            src={logo}
            alt="Blogr Logo"
            width="100px"
            style={{ marginRight: '1rem' }}
          />
        </Link>
  
        
  
        <div style={{ display: 'flex', alignItems: 'center' }}>
        
          <Link to="/createblog">
            <Button className="ml-2 bg-tan"> Create Post </Button>
          </Link>
  
          <Link to="/myblogs">
            <Button className="ml-2 bg-tan"> My Blogs </Button>
          </Link>
  
          <Button className="ml-2 mr-4 bg-tan" onClick={signOut}>
            Logout
          </Button>
        </div>
      </header>
    );
  };
  
  export default Header;