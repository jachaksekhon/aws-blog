export const getUserSubscriptionByUser = /* GraphQL */ `
  query GetUserSubscriptionByUser($userName: String!) {
    getUserSubscription(userName: $userName) {
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