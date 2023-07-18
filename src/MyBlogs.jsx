import React, { useState, useEffect } from 'react';
import { Auth, API, Storage } from 'aws-amplify';
import { Text, View, Flex, Button, RadioGroupField, Radio } from '@aws-amplify/ui-react';

import { listBlogPosts } from './graphql/queries';
import { deleteBlogPosts } from './graphql/mutations';


import Header from './Header';
import BlogSnippet from './BlogSnippet';

const MyBlogs = () => {
  const [user, setUser] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [userFetched, setUserFetched] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  function getUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    })
      .then((user) => {
        setUser(user.username);
        setUserFetched(true);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userFetched) {
      getBlogs();
    }
  }, [userFetched, selectedCategories]);

  async function getBlogs() {
    const apiData = await API.graphql({ query: listBlogPosts });
    const blogsFromApi = apiData.data.listBlogPosts.items;


    let filteredBlogs = blogsFromApi.filter((blog) => blog.postAuthor === user);
   
    if (selectedCategories.length > 0) {
      filteredBlogs = filteredBlogs.filter((blog) => selectedCategories.includes(blog.postCategory));
    }

    await Promise.all(
      filteredBlogs.map(async (blog) => {
        if (blog.postImage) {
          const url = await Storage.get(blog.postTitle);
          blog.postImage = url;
        }
        return blog;
      })
    );

    setBlogs(filteredBlogs);
  }

  async function deleteBlog(id, postTitle) {

    const confirmed = window.confirm('Are you sure you want to delete this blog?');
      if (!confirmed) {
        return;
      }

    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
    await Storage.remove(postTitle)
      try {
        await API.graphql({
          query:  deleteBlogPosts,
          variables: { 
            input: { 
              id
              }
            }
        });
    }
    catch(error) {
      console.error(error)
    } 
    
  }

  function handleCategoryToggle(category) {
    const updatedCategories = [...selectedCategories];
    const categoryIndex = updatedCategories.indexOf(category);

    if (categoryIndex !== -1) {
      // Category is already selected, remove it from the array
      updatedCategories.splice(categoryIndex, 1);
    } else {
      // Category is not selected, add it to the array
      updatedCategories.push(category);
    }

    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <Header />

      <Flex direction="column" alignItems="center">
        <h1 className="text-3xl font-bold mb-6 mt-6">Your Blogs</h1>

        <Flex direction="row" alignItems="center" justifyContent="center">
          <Button
            className={`ml-2 ${selectedCategories.length === 0 ? 'selected' : ''}`}
            onClick={() => setSelectedCategories([])}
            style={selectedCategories.length === 0 ? { backgroundColor: 'lightblue' } : {}}
          >
            All Categories
          </Button>
          <Button
            className={`ml-2 ${selectedCategories.includes('Finance') ? 'selected' : ''}`}
            onClick={() => handleCategoryToggle('Finance')}
            style={selectedCategories.includes('Finance') ? { backgroundColor: 'lightblue' } : {}}
          >
            Finance
          </Button>
          <Button
            className={`ml-2 ${selectedCategories.includes('Gaming') ? 'selected' : ''}`}
            onClick={() => handleCategoryToggle('Gaming')}
            style={selectedCategories.includes('Gaming') ? { backgroundColor: 'lightgreen' } : {}}
          >
            Gaming
          </Button>
          <Button
            className={`ml-2 ${selectedCategories.includes('Technology') ? 'selected' : ''}`}
            onClick={() => handleCategoryToggle('Technology')}
            style={selectedCategories.includes('Technology') ? { backgroundColor: 'peachpuff' } : {}}
          >
            Technology
          </Button>
        </Flex>

        {blogs.map((blog) => (
          <BlogSnippet
            key={blog.id || blog.name}
            post={blog}
            showDelButton={true}
            onDelete={() => deleteBlog(blog.id, blog.postTitle)}
          />
        ))}
      </Flex>
    </>
  );
};

export default MyBlogs;