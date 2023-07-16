import React, { useEffect, useState } from 'react'
import "@aws-amplify/ui-react/styles.css"
import { Button, Heading, View, Flex, Text } from "@aws-amplify/ui-react"
import { Auth, API, Storage } from 'aws-amplify';
import * as mutations from './graphql/mutations'
import { listBlogPosts } from './graphql/queries'
import BlogSnippet from './BlogSnippet';


export const HomePage = () => {

  const [blogs, setBlogs] = useState([])

  useEffect (() => {
    getBlogs()
  }, [])

  async function getBlogs() {
    const apiData = await API.graphql({ query: listBlogPosts})
    const blogsFromApi = apiData.data.listBlogPosts.items;
    await Promise.all(
      blogsFromApi.map(async(blog) => {
        console.log(blog.postImage)
        if (blog.postImage) {
          const url = await Storage.get(blog.postTitle);
          blog.postImage = url;
        }
        return blog;
      })
    )
    setBlogs(blogsFromApi);
  }

  return (
    <>

      <Heading level={2}>New Blogs!</Heading>

        {blogs.map((blog) =>
          <BlogSnippet key = {blog.id || blog.name} 
          title = {blog.postTitle}
          body = {blog.postBody}
          author = {blog.postAuthor}
          category = {blog.postCategory}
          image = {blog.postImage} >
          </BlogSnippet>
        )}

    </> 
    
  )
}

export default HomePage