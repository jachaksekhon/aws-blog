import { React, useState, useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { Text, Card, Flex, Image } from '@aws-amplify/ui-react'

import { getBlogPosts, listBlogPosts } from './graphql/queries'
import { API, Storage } from 'aws-amplify'

import Header from './Header'

export const BlogReadMore = () => {

  // retrieve ID from passed in URL
  const id = useParams()

  const [blog, setBlog] = useState("")
  const [relatedBlogs, setRelatedBlogs] = useState([])

  useEffect(() => {
    if(id){
      getBlog(id.id)
    }
    
  }, [id])

  useEffect(() => {
    if(blog){
      getRelatedBlogs(blog.postCategory, blog.id)
    }
    console.log(relatedBlogs)
  }, [blog])

  // get the blog based off of the passed in ID

  async function getBlog(id) {
    try {
      const { data } = await API.graphql({
        query: getBlogPosts,
        variables: {
          id,
        },
      });

      const currentBlog = data.getBlogPosts;
      if (currentBlog.postImage) {
        const url = await Storage.get(currentBlog.postTitle);
        currentBlog.postImage = url;
      }

      setBlog(currentBlog);
    } catch (error) {
      console.error('Error retrieving blog:', error);
    }
    
  }

  // get the blogs related to current category of blogs
  async function getRelatedBlogs(category, currentId) {
    try {
      const { data } = await API.graphql({
        query: listBlogPosts, // Assuming your query for fetching all blog posts is named `listBlogPosts`
        variables: {
          filter: {
            postCategory: {
              eq: category,
            },
            id: {
              ne: currentId
            }
          },
        },
      });
  
      const relatedBlogs = data.listBlogPosts.items;
      await Promise.all(
        relatedBlogs.map(async(blog) => {
          if (blog.postImage) {
            const url = await Storage.get(blog.postTitle);
            blog.postImage = url;
          }
          return blog;
        })
      )
      // Perform any necessary transformations or formatting on the related blogs data
      setRelatedBlogs(relatedBlogs);
    } catch (error) {
      console.error('Error retrieving related blogs:', error);
    }
  }


  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-6">
            {blog && (
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {blog.postImage && (
                  <img
                    src={blog.postImage}
                    alt="Blog"
                    className="w-full h-64 object-cover object-center"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{blog.postTitle}</h2>
                  <p className="text-gray-500 mb-2">
                    By {blog.postAuthor} |{' '}
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 mb-4">{blog.postBody}</p>
                  <p className="text-gray-600 mb-4">
                    Category: {blog.postCategory}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-4">Related Blogs</h2>
            {relatedBlogs.map((relatedBlog) => (
              <Card key={relatedBlog.id} className="mb-4">
                <Flex direction="column">
                  {relatedBlog.postImage && (
                    <Image
                      src={relatedBlog.postImage}
                      alt="Related Blog"
                      className="w-full h-40 object-cover object-center"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{relatedBlog.postTitle}</h3>
                    <p className="text-gray-500 mb-2">
                      By {relatedBlog.postAuthor} |{' '}
                      {new Date(relatedBlog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-600 mb-2">
                      Category: {relatedBlog.postCategory}
                    </p>
                    <Text
                      className="text-sm text-gray-600 line-clamp-1"
                      style={{ minHeight: '6rem' }}
                    >
                      {relatedBlog.postBody}
                    </Text>
                  </div>
                </Flex>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogReadMore;