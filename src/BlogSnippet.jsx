import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Card,
    Image,
    View,
    Heading,
    Flex,
    Badge,
    Text,
    Button, } from '@aws-amplify/ui-react'

export const BlogSnippet = ( {post, showDelButton, onDelete} ) => {
    console.log(post.postAuthor)

    // const date = post.date.split("T")[0]

  return (
    <>
        <div className='w-full flex justify-center items-center'>
            <div className=" w-blogWidth">
            <Card
            variation='outlined'
            width="100%"
            className=" m-auto p-5 mt-3 mb-3 border-t-1
            bg-gradient-to-b from-slate-500 to-yellow-100
            rounded-xl border-4 shadow-lg hover:opacity-90"
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
                        className=' text-yellow-50 cursor-default '>
                            {post.postTitle}
                        </Heading>

                        {/* Post Author & Date */}
                        
                        <Text >
                            {/* {post.author} {date} */}
                        </Text>

                        {/* Post body */}

                        <Text
                        className=' ml-5 mr-5 line-clamp-2 text-gray-400 text-sm cursor-default italic'> 
                            {post.postBody}
                        </Text>

                    <Button variation="primary" className=' bg-slate-700'>Read More</Button>

                    {showDelButton && (
                        <Button variation="danger" className="bg-red-500" onClick={onDelete}>
                             Delete
                        </Button>
                    )}
                    
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
