/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlogPosts = /* GraphQL */ `
  subscription OnCreateBlogPosts(
    $filter: ModelSubscriptionBlogPostsFilterInput
  ) {
    onCreateBlogPosts(filter: $filter) {
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
export const onUpdateBlogPosts = /* GraphQL */ `
  subscription OnUpdateBlogPosts(
    $filter: ModelSubscriptionBlogPostsFilterInput
  ) {
    onUpdateBlogPosts(filter: $filter) {
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
export const onDeleteBlogPosts = /* GraphQL */ `
  subscription OnDeleteBlogPosts(
    $filter: ModelSubscriptionBlogPostsFilterInput
  ) {
    onDeleteBlogPosts(filter: $filter) {
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
export const onCreateUserSubscription = /* GraphQL */ `
  subscription OnCreateUserSubscription(
    $filter: ModelSubscriptionUserSubscriptionFilterInput
  ) {
    onCreateUserSubscription(filter: $filter) {
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
export const onUpdateUserSubscription = /* GraphQL */ `
  subscription OnUpdateUserSubscription(
    $filter: ModelSubscriptionUserSubscriptionFilterInput
  ) {
    onUpdateUserSubscription(filter: $filter) {
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
export const onDeleteUserSubscription = /* GraphQL */ `
  subscription OnDeleteUserSubscription(
    $filter: ModelSubscriptionUserSubscriptionFilterInput
  ) {
    onDeleteUserSubscription(filter: $filter) {
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
