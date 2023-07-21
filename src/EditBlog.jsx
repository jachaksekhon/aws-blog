import { React, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API, Storage, Auth } from 'aws-amplify'
import { Button, Heading, TextField, View, RadioGroupField, Radio, Flex } from "@aws-amplify/ui-react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { StorageManager } from '@aws-amplify/ui-react-storage'
import { updateBlogPosts } from './graphql/mutations'
import { getBlogPosts } from './graphql/queries'
import Header from "./Header"

const EditBlog = () => {
  const [category, setCategory] = useState("Technology")
  const [user, setUser] = useState("")
  const [postBody, setPostBody] = useState('')
  const [curTitle, setCurTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  async function getUser() {
    try {
      const data = await Auth.currentUserInfo()
      setUser({ user: data.username })
    } catch (error) {
      console.log('Error fetching user info: ', error)
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  async function fetchBlog() {
    try {
      const apiData = await API.graphql({ query: getBlogPosts, variables: { id } })
      const blog = apiData.data.getBlogPosts
      setCategory(blog.postCategory)
      setPostBody(blog.postBody)
      setCurTitle(blog.postTitle)
    } catch (error) {
      console.log('Error fetching blog post: ', error)
    }
  }

  useEffect(() => {
    getUser()
    fetchBlog()
  }, [])

  async function editBlogPost(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const data = {
      id,
      postTitle: form.get("title"),
      postCategory: form.get("category"),
      postBody,
      postAuthor: user.user,
      postImage: selectedImage ? selectedImage.name : null,
    }

    if (selectedImage) {
      await Storage.put(data.postTitle, selectedImage);
    }

    try {
      await API.graphql({
        query: updateBlogPosts,
        variables: { input: data }
      })
      setSuccessMessage('Successfully updated your blog!')
      setTimeout(() => {
        setSuccessMessage('')
        navigate('/myblogs')
      }, 2000)
    } catch (error) {
      console.error('Error updating blog post: ', error)
    }
  }

  const handlePostBodyChange = (content) => {
    setPostBody(content)
  }

  return (
    <>
      <Header />

      <Heading level={4} className="text-tan ml-[215px] mb-3 pt-3 pl-2">
        Edit Blog
      </Heading>

      <View as="form" className="px-4 pt-4 pb-8 ml-[210px] lg:w-createBlogWidthL sm:w-createBlogWidthS" onSubmit={editBlogPost}>
        <TextField
          className="w-full pb-4 mb-4"
          name="title"
          size="default"
          value={curTitle}
          onChange={(e) => setCurTitle(e.target.value)}
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

        <Flex direction="column" gap="3rem" className="pb-5">
          <ReactQuill
            value={postBody}
            onChange={handlePostBodyChange}
            theme="snow"
            className="mb-4 h-96"
          />

          <View name="image" className="mb-4 mt-12" as="input" type="file" onChange={handleImageChange} />
        </Flex>

        <View>
          <Button className="mr-2" name="backToHome">
            Discard
          </Button>

          <Button className="" type="submit" name="createPost">
            Save Changes
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
  )
}

export default EditBlog;