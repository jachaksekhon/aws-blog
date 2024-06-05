import { useState, useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { Card, Flex, Image, Badge } from '@aws-amplify/ui-react'
import { Link } from 'react-router-dom'

import { getBlogPosts, listBlogPosts } from '../graphql/queries'
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
        query: listBlogPosts, 
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
      const maxRelatedBlogs = relatedBlogs.slice(0, 3);
      setRelatedBlogs(maxRelatedBlogs);
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
                    alt="Supplementary image for blog"
                    className="w-full h-64 object-cover object-center"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{blog.postTitle} </h2>
                  <h2 className='mb-2 -ml-0.5'>
                    { blog.postCategory === 'Finance' && (
                        <Badge size="small" variation="info">
                        Finance
                        </Badge>
                    )}
                    
                    { blog.postCategory === 'Gaming' && (
                        <Badge size="small" variation="success">
                        Gaming
                        </Badge>
                    )}

                    { blog.postCategory === 'Technology' && (
                        <Badge size="small" variation="warning">
                        Technology
                        </Badge>
                    )}
                  </h2>
                  <p className="text-gray-500 mb-2">
                    By {blog.postAuthor} |{' '}
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 mb-4"><div dangerouslySetInnerHTML={{ __html: blog.postBody }} /></p>
                 
                </div>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <h2 className="text-l font-semibold mb-4">Blogs Related to:    { blog.postCategory === 'Finance' && (
                  <Badge size="small" variation="info">
                  Finance
                  </Badge>
              )}
              
              { blog.postCategory === 'Gaming' && (
                  <Badge size="small" variation="success">
                  Gaming
                  </Badge>
              )}

              { blog.postCategory === 'Technology' && (
                  <Badge size="small" variation="warning">
                  Technology
                  </Badge>
              )}
              </h2>
              
            {relatedBlogs.map((relatedBlog) => (
              <Card key={relatedBlog.id} className="mb-4 border border-gray-300 rounded-lg shadow-xl hover:ring-blue-100">
                <Flex direction="column">
                  {relatedBlog.postImage && (
                    <Image
                      src={relatedBlog.postImage}
                      alt="Related Blog"
                      className="w-full h-40 object-cover object-center"
                    />
                  )}
                  <div className="p-4">
                    <Link to={`/blog/${relatedBlog.id}`}>
                      <h3 className="text-lg font-semibold mb-2">{relatedBlog.postTitle}</h3>
                    </Link>
                    <p className="text-gray-500 mb-2">
                      By {relatedBlog.postAuthor} |{' '}
                      {new Date(relatedBlog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
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