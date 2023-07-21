import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import PropTypes from 'prop-types';
import { Card,
    Image,
    View,
    Heading,
    Flex,
    Badge,
    Text,
    Button, } from '@aws-amplify/ui-react'

export const BlogSnippet = ( {post, showDelButton, onDelete, showEditButton, onEdit} ) => {

    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

  return (
    <>
        <div className='w-full flex justify-center items-center'>
            <div className=" w-blogWidth">
                <Card
                variation='outlined'
                width="100%"
                className="m-auto p-5 mt-3 mb-3 border border-gray-300 bg-white rounded-xl shadow-md hover:shadow-lg hover:ring-4 hover:ring-blue-100 transition duration-300 ease-in-out"
                >
                    <Flex
                        direction="column"
                        alignItems="center"
                        className=" "
                        >
                            <div className="h-40">
                                {/* Post image/banner */}
                                {post.postImage && (
                                    <Image
                                    className=' w-full h-full object-cover rounded-xl'
                                    src={post.postImage}
                                    alt={`visual aid for ${post.postTitle}`}
                                    style={{ width: 600 }}
                                    ></Image>
                                )}
                            </div>
                            {/* Post Category  */}

                            <Flex className=' mt-1 cursor-default'>
                                { post.postCategory === 'Finance' && (
                                    <Badge size="small" variation="info">
                                    Finance
                                    </Badge>
                                )}
                                
                                { post.postCategory === 'Gaming' && (
                                    <Badge size="small" variation="success">
                                    Gaming
                                    </Badge>
                                )}

                                { post.postCategory === 'Technology' && (
                                    <Badge size="small" variation="warning">
                                    Technology
                                    </Badge>
                                )}
                            
                            </Flex>

                            {/* Post Title */}

                            <Heading level={5}
                            className='text-gray-800 cursor-default mt-2 '>
                                {post.postTitle}
                            </Heading>

                            {/* Post Author & Date */}
                            
                            <Text className="text-gray-500 text-sm mr-2">
                                {post.postAuthor} {formattedDate}
                            </Text>
                                

                            {/* Post body */}

                            <Text
                            className=' ml-5 mr-5 line-clamp-2 text-gray-400 text-sm cursor-default italic'> 
                                <div dangerouslySetInnerHTML={{ __html: post.postBody }} />
                            </Text>

                        <Link to={`/blog/${post.id}`}>
                            <Button variation="primary" className=' bg-gray-800 text-white mt-4'>Read More</Button>
                        </Link>
                        
                        <Flex
                        direction="row">
                            {showDelButton && (
                                <Button variation="danger" className="bg-red-500" onClick={onDelete}>
                                    Delete
                                </Button>
                            )}

                            {showEditButton && (
                                <Link to={`/editblog/${post.id}`} className="ml-2">
                                    <Button className=' bg-green-500'>Edit Post</Button>
                                </Link>
                            )}
                        </Flex>
                        
                        
                    </Flex>
                </Card>
            
            </div>
        </div>
    </>
  )
};

BlogSnippet.propTypes = {
    post: PropTypes.shape({
      postTitle: PropTypes.string.isRequired,
      postCategory: PropTypes.string.isRequired,
      postAuthor: PropTypes.string.isRequired,
      postBody: PropTypes.string.isRequired,
      postImage: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    showDelButton: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
  };

export default BlogSnippet
