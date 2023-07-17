import React from 'react'
import logo from './assets/blogr.jpg'
import { Flex, Image, Button, View } from '@aws-amplify/ui-react'
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
    <>
        <Flex
        direction='row'
        justifyContent="flex-end"
        alignItems="center"
        className='border-solid border-r-0 border-l-0 border-t-0 border-b-2 border '
        >
            <Link className= " m-auto" to="/">
              <Image
              className=' m-4 p-1 pb-7'
              src={logo}
              alt="Blogr Logo"
              width='25%'
              ></Image>
            </Link>
            

            <Link to="/createblog">
                <Button className=' ml-auto'> Create Post </Button>
            </Link>
            
            <Link to="/myblogs">
                <Button className=' ml-auto'> My Blogs </Button>
            </Link>

            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg> */}

            <Button 
            className=' mr-4'
            onClick={ signOut }
            > Logout </Button>

        </Flex>
        
    </>
  )
}

export default Header