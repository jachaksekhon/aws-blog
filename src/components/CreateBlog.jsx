import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 

import { API, Storage, Auth } from 'aws-amplify'
import {
    Button,
    Heading,
    TextField,
    View,
    RadioGroupField,
    Radio,
    Flex
  } from "@aws-amplify/ui-react"

import * as mutations from '../graphql/mutations'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Header from "./Header"



export const CreateBlog = () => {

  const [category, setCategory] = useState("Technology")
  const [user, setUser] = useState("");
  const [postBody, setPostBody] = useState('');
  // const [file, setFile] = useState('');
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()

  const handleDiscard = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to discard the post?' 
    );
    if (isConfirmed) {
      navigate('/');
    }
  };


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

    if (!image) {
      const confirmed = window.confirm("You haven't uploaded an image. Continue?");
      if (!confirmed) return;
    }

    const data = {
      postTitle: form.get("title"),
      postCategory: form.get("category"),
      postBody: postBody,
      postAuthor: user.user,
      postImage: image ? image.name : null
    }
    
    if (data.postImage) await Storage.put(data.postTitle, image)

    try {
      await API.graphql({
        query: mutations.createBlogPosts,
        variables: { input: data }
      })
      setSuccessMessage('Successfully posted your blog!')
      event.target.reset()

      await fetch('https://nifdmhes0f.execute-api.us-west-1.amazonaws.com/Production/blognotificationresource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category: data.postCategory })
      });

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
        className="text-tan ml-[215px] mb-3 pt-3 pl-2"
      >
        Create Blog
      </Heading>

      <View as="form" className="px-4 pt-4 pb-8 ml-[210px] lg:w-createBlogWidthL sm:w-createBlogWidthS" onSubmit={createBlogPost}>
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
        </Flex>
        
        <View>
          <Button className="mr-2" onClick={handleDiscard}>
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