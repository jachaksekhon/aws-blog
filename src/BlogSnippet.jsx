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
    >
      <Card
      variation='outlined'
      >
        <Flex direction="row" alignItems="flex-start">

          {post.image && (
              <Image
                src={post.image}
                alt={`visual aid for ${post.title}`}
                style={{ width: 1000 }}
              />
            )}

          <Flex
            direction="column"
            alignItems="flex-start"
          >

            

            <Heading level={5}>
              {post.title}
              <Flex className=' mt-1'>
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
            </Heading>

            

            <Text> 
              {post.body}
            </Text>


            <Button variation="primary" className=' bg-slate-700'>Read More</Button>
            
          </Flex>
        </Flex>
      </Card>
    </View>
    </>
  )
}

export default BlogSnippet
