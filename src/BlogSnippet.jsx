import React from 'react'
import { Card,
    Image,
    View,
    Heading,
    Flex,
    Badge,
    Text,
    Button, } from '@aws-amplify/ui-react'

export const BlogSnippet = ( post ) => {

    const category = post.category

  return (
    <>
    <View 
    as="div"
    className=' justify-center'
    >
      <Card
      variation='outlined'
      width="45%"
      className=" m-auto p-5 mt-3 mb-3 border-t-1
      bg-gradient-to-b from-slate-500 to-yellow-100
      rounded-xl border-4 shadow-lg hover:opacity-90"
      >
          
          <Flex
            direction="column"
            alignItems="center"
            className=" "
            >

                {/* Post image/banner */}
                {post.image && (
                    <Image
                    className=' pt-5 rounded-xl rounded-full'
                    src={post.image}
                    alt={`visual aid for ${post.title}`}
                    style={{ width: 600 }}
                    ></Image>
                )}

                {/* Post Category  */}

                <Flex className=' mt-1 cursor-default'>
                    { category === 'Finance' && (
                        <Badge size="small" variation="info">
                        Finance
                        </Badge>
                    )}
                    
                    { category === 'Gaming' && (
                        <Badge size="small" variation="success">
                        Gaming
                        </Badge>
                    )}

                    { category === 'Technology' && (
                        <Badge size="small" variation="warning">
                        Technology
                        </Badge>
                    )}
                
                </Flex>

                {/* Post Title */}

                <Heading level={5}
                className=' text-yellow-50 cursor-default '>
                {post.title}
                </Heading>
                
                

                {/* Post body */}

                <Text
                className=' ml-5 mr-5 line-clamp-2 text-gray-400 text-sm cursor-default italic'> 
                    {post.body}
                </Text>

            <Button variation="primary" className=' bg-slate-700'>Read More</Button>
            
          </Flex>
      </Card>
    </View>
    </>
  )
}

export default BlogSnippet
