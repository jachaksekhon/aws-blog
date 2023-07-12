/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlogPosts = /* GraphQL */ `
  mutation CreateBlogPosts(
    $input: CreateBlogPostsInput!
    $condition: ModelBlogPostsConditionInput
  ) {
    createBlogPosts(input: $input, condition: $condition) {
      pid
      postTitle
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
export const updateBlogPosts = /* GraphQL */ `
  mutation UpdateBlogPosts(
    $input: UpdateBlogPostsInput!
    $condition: ModelBlogPostsConditionInput
  ) {
    updateBlogPosts(input: $input, condition: $condition) {
      pid
      postTitle
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
export const deleteBlogPosts = /* GraphQL */ `
  mutation DeleteBlogPosts(
    $input: DeleteBlogPostsInput!
    $condition: ModelBlogPostsConditionInput
  ) {
    deleteBlogPosts(input: $input, condition: $condition) {
      pid
      postTitle
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
