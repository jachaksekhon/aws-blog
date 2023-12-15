/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlogPosts = /* GraphQL */ `
  query GetBlogPosts($id: ID!) {
    getBlogPosts(id: $id) {
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
export const listBlogPosts = /* GraphQL */ `
  query ListBlogPosts(
    $filter: ModelBlogPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUserSubscription = /* GraphQL */ `
  query GetUserSubscription($id: ID!) {
    getUserSubscription(id: $id) {
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
export const listUserSubscriptions = /* GraphQL */ `
  query ListUserSubscriptions(
    $filter: ModelUserSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
