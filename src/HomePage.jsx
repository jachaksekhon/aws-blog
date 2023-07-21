import React, { useEffect, useState } from 'react'


import "@aws-amplify/ui-react/styles.css"
import { Button, Heading, View, Flex, RadioGroupField, Radio } from "@aws-amplify/ui-react"
import { Auth, API, Storage } from 'aws-amplify';
import * as mutations from './graphql/mutations'
import { listBlogPosts } from './graphql/queries'

import BlogSnippet from './BlogSnippet';
import { Route } from 'react-router-dom'

export const HomePage = () => {

  const [blogs, setBlogs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");





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
    blogsFromApi.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBlogs(blogsFromApi);
  }

  return (
    <>
      <Flex direction="row" gap="2rem" justifyContent="center">
        <View >
          <Heading level={4} className="text-tan">
            Filter by Category:
          </Heading>
          <RadioGroupField
            direction="column"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <Radio value="All">All</Radio>
            <Radio value="Technology">Technology</Radio>
            <Radio value="Finance">Finance</Radio>
            <Radio value="Gaming">Gaming</Radio>
          </RadioGroupField>
        </View>

        <View style={{ paddingRight: '130px' }}>
          {blogs
            .filter(
              (blog) =>
                selectedCategory === "All" || blog.postCategory === selectedCategory
            )
            .map((blog) => (
              <BlogSnippet
                key={blog.id || blog.postTitle}
                post={blog}
                showDelButton={false}
                showEditButton={false}
              />
            ))}
        </View>
      </Flex>
    </>
  );
};

export default HomePage