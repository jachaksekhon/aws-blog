import React, { useEffect, useState } from 'react'


import "@aws-amplify/ui-react/styles.css"
import { Button, Heading, View, Flex, Text } from "@aws-amplify/ui-react"
import { Auth, API, Storage } from 'aws-amplify';
import * as mutations from './graphql/mutations'
import { listBlogPosts } from './graphql/queries'

import BlogSnippet from './BlogSnippet';
import { Route } from 'react-router-dom'

export const HomePage = () => {

  const [blogs, setBlogs] = useState([])

  const [wantSorted, setWantSorted] = useState(true)

  useEffect (() => {
    getBlogs()
  }, [])

  async function getBlogs() {
    const apiData = await API.graphql({ query: listBlogPosts})
    const blogsFromApi = apiData.data.listBlogPosts.items;
    await Promise.all(
      blogsFromApi.map(async(blog) => {
        if (blog.postImage) {
          const url = await Storage.get(blog.postTitle);
          blog.postImage = url;
        }
        console.log(blog)
        return blog;
      })
    )
    // Sort blogs by createdAt in descending order (most recent first)
    if (wantSorted) {
      blogsFromApi.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    }
    
    setBlogs(blogsFromApi);
  }

  return (
    <>
        <h2 className="text-center font-serif text-tan text-lg p-4">
        Explore a world of captivating stories, insightful articles, and thought-provoking perspectives
      </h2>

        <View
        >
          {blogs.map((blog) =>
            <BlogSnippet key = {blog.id || blog.postTitle} 
            post = {blog}
            showDelButton={false}
            showEditButton={false}
            >
            </BlogSnippet>
          )}
        </View>
      
    </> 
    
  )
}

export default HomePage