import { React, useState, useEffect } from 'react'
import { Route, Link, useNavigate } from 'react-router-dom' 

import { API, Storage, Auth } from 'aws-amplify'
import {
    Button,
    Heading,
    TextField,
    View,
    RadioGroupField,
    Radio,
    FileUploader,
    ThemeProvider,
    Flex
    
  } from "@aws-amplify/ui-react"

  import { StorageManager } from '@aws-amplify/ui-react-storage';

import * as mutations from './graphql/mutations'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { HomePage } from './HomePage'
import Header from "./Header"



export const CreateBlog = () => {

  const theme = {
    name: 'my-theme',
    tokens: {
      colors: {},
      borderWidths: {
        small: { value: '2px' },
        medium: { value: '4px' },
        large: { value: '8px' },
      },
      radii: {
        xs: { value: '1rem' },
        small: { value: '2rem' },
        medium: { value: '2rem' },
        large: { value: '2rem' },
        xl: { value: '3rem' },
      },
    },
  };

  const [category, setCategory] = useState("Technology")
  const [user, setUser] = useState("");
  const [postBody, setPostBody] = useState('');
  // const [file, setFile] = useState('');
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()


  async function getUser() {
    await Auth.currentUserInfo()
      .then((data) => {
        setUser({ user: data.username });
      })
      .catch(error => console.log(`Error: ${error.message}`));
  }

  async function createBlogPost(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const image = form.get("image")
    const data = {
      postTitle: form.get("title"),
      postCategory: form.get("category"),
      postBody: postBody,
      postAuthor: user.user,
      postImage: image.name
    }
    console.log(data.postTitle)
    console.log(data.postCategory)
    console.log(data.postBody)
    console.log(data.postAuthor)
    console.log(data.postImage)
    
    if (data.postImage) await Storage.put(data.postTitle, image)

    try {
      await API.graphql({
        query: mutations.createBlogPosts,
        variables: { input: data }
      })
      setSuccessMessage('Successfully posted your blog!')
      event.target.reset()
      setTimeout(() => {
        setSuccessMessage('')
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Error creating blog post:', error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handlePostBodyChange = (content) => {
    setPostBody(content);
  };
  

  return (
    <>
      <Header />

      <Heading
        level={4}
        className="text-green-600 ml-2 mb-3 pt-3 pl-2"
      >
        Create Blog
      </Heading>

      <View as="form" className="px-4 pt-4 pb-8  lg:w-createBlogWidthL sm:w-createBlogWidthS" onSubmit={createBlogPost}>
        <TextField
          className="w-full pb-4 mb-4"
          name="title"
          size="default"
          placeholder="Blog Title..."
          label="Blog name"
          isRequired
        />
    
        <RadioGroupField
          className="mb-4 pb-4"
          name="category"
          direction="row"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category:"
          isRequired
          errorMessage="This is a required field. Please select an option."
          hasError={!category}
        >
          <Radio value="Technology">Technology</Radio>
          <Radio value="Finance">Finance</Radio>
          <Radio value="Gaming">Gaming</Radio>
        </RadioGroupField>

        <Flex
        direction="column"
        gap="3rem"
        className='pb-5'>
          <ReactQuill
            value={postBody}
            onChange={handlePostBodyChange}
            theme="snow"
            className="mb-4 h-96"
          />

          <View
            name="image"
            className="mb-4 mt-12"
            as="input"
            type="file"
          />

          {/* <ThemeProvider theme={theme}>
            <StorageManager
            className=""
            variation='drop'
            acceptedFileTypes={['image/*']}
            showImages={true}
            maxFileCount={1}
            accessLevel="public"
            onUploadSuccess={({ key }) => {
              setFile((prevFile) => {
                return {
                  ...prevFile,
                  [key]: {
                    status: 'success',
                  },
                };
              });
            }}
            />
          </ThemeProvider> */}
        </Flex>
        
        

        <View>
          <Button className="mr-2" name="backToHome">
            Discard
          </Button>

          <Button
            className=""
            type="submit"
            name="createPost"
          >
            Create Post!
          </Button>
        </View>
      </View>

      {successMessage && (
        <View className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <View className="bg-white p-4 rounded-md">
            <p className="text-green-500">{successMessage}</p>
          </View>
        </View>
      )}
    </>
  );
};

export default CreateBlog;