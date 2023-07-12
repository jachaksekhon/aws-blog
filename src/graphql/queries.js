/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlogPosts = /* GraphQL */ `
  query GetBlogPosts($id: ID!) {
    getBlogPosts(id: $id) {
      pid
      postTitle
      postCategory
      postAuthor
      postBody
      postImage
      createdAt
      id
      updatedAt
      __typename
    }
  }
`;
export const listBlogPosts = /* GraphQL */ `
  query ListBlogPosts(
    $filter: ModelBlogPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        pid
        postTitle
        postCategory
        postAuthor
        postBody
        postImage
        createdAt
        id
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
