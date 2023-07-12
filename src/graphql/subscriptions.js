/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlogPosts = /* GraphQL */ `
  subscription OnCreateBlogPosts(
    $filter: ModelSubscriptionBlogPostsFilterInput
  ) {
    onCreateBlogPosts(filter: $filter) {
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
export const onUpdateBlogPosts = /* GraphQL */ `
  subscription OnUpdateBlogPosts(
    $filter: ModelSubscriptionBlogPostsFilterInput
  ) {
    onUpdateBlogPosts(filter: $filter) {
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
export const onDeleteBlogPosts = /* GraphQL */ `
  subscription OnDeleteBlogPosts(
    $filter: ModelSubscriptionBlogPostsFilterInput
  ) {
    onDeleteBlogPosts(filter: $filter) {
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
