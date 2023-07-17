import { React, useState, useEffect } from 'react'
import { API, Storage, Auth } from 'aws-amplify'
import * as mutations from './graphql/mutations'
import { Route, Link } from 'react-router-dom' 
import { HomePage } from './HomePage'
import Header from "./Header"
import {
    Button,
    Heading,
    TextField,
    View,
    RadioGroupField,
    Radio,
    TextAreaField,
    FileUploader
    
  } from "@aws-amplify/ui-react"


export const CreateBlog = () => {
  const [category, setCategory] = useState("Technology")
  const [user, setUser] = useState("");

  async function getUser() {
    await Auth.currentUserInfo()
      .then((data) => {
        setUser({ user: data.username });
      })
      .catch(error => console.log(`Error: ${error.message}`));
  }

  async function createBlogPost(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
        postTitle: form.get("title"),
        postCategory: form.get("category"),
        postBody: form.get("postbody"),
        postAuthor: user.user,
        postImage: image.name
    };
    if (data.postImage) await Storage.put(data.postTitle, image);
    
    await API.graphql({
        query: mutations.createBlogPosts,
        variables: { input: data }
    });
    // we can fetch posts here after inserting
    event.target.reset()
  }

  useEffect(() => {
    getUser()
  }, [])
  

  return (
    <>
          <Header/>

          <View>
              <Heading 
              level={4}
              className="text-green-600 ml-4 mb-3 "> Hi this is the create blog page </Heading>
          </View>

          <View as='form' className=' px-2' onSubmit={createBlogPost}>
              <TextField 
              className=" border-black w-90 p-2" 
              name = "title"
              size = "default"
              descriptiveText = ""
              placeholder='Blog Title...'
              label="Blog name"
              isRequired
              ></TextField>

              <RadioGroupField
              className=" m-2"
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

              <TextAreaField 
              name="postbody"
              className=" border-black w-90 p-2"
              placeholder='Enter blog content here...' 
              label="Blog body"
              resize='both'
              row="10"
              isRequired
              ></TextAreaField>

              <View
              name="image"
              className=" p-2"
              as="input"
              type="file"
              />
              

              <View>
                  <Button
                  className=""
                  name="backToHome"> Discard
                  </Button>

                  <Button
                  to="/" 
                  className=""
                  type="submit"
                  name="createPost">Create Post!</Button>
              </View>
              
          </View>
        


    </>
    
  )
}

export default CreateBlog