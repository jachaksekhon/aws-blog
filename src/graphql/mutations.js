/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlogPosts = /* GraphQL */ `
  mutation CreateBlogPosts(
    $input: CreateBlogPostsInput!
    $condition: ModelBlogPostsConditionInput
  ) {
    createBlogPosts(input: $input, condition: $condition) {
      id
      postTitle
      postCategory
      postAuthor
      postBody
      postImage
      createdAt
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
      id
      postTitle
      postCategory
      postAuthor
      postBody
      postImage
      createdAt
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
      id
      postTitle
      postCategory
      postAuthor
      postBody
      postImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserSubscription = /* GraphQL */ `
  mutation CreateUserSubscription(
    $input: CreateUserSubscriptionInput!
    $condition: ModelUserSubscriptionConditionInput
  ) {
    createUserSubscription(input: $input, condition: $condition) {
      id
      userName
      phoneNumber
      email
      sendEmailNoti
      sendPhoneNoti
      genres
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserSubscription = /* GraphQL */ `
  mutation UpdateUserSubscription(
    $input: UpdateUserSubscriptionInput!
    $condition: ModelUserSubscriptionConditionInput
  ) {
    updateUserSubscription(input: $input, condition: $condition) {
      id
      userName
      phoneNumber
      email
      sendEmailNoti
      sendPhoneNoti
      genres
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserSubscription = /* GraphQL */ `
  mutation DeleteUserSubscription(
    $input: DeleteUserSubscriptionInput!
    $condition: ModelUserSubscriptionConditionInput
  ) {
    deleteUserSubscription(input: $input, condition: $condition) {
      id
      userName
      phoneNumber
      email
      sendEmailNoti
      sendPhoneNoti
      genres
      createdAt
      updatedAt
      __typename
    }
  }
`;
