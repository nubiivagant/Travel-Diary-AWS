/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTravelEntry = /* GraphQL */ `
  query GetTravelEntry($id: ID!) {
    getTravelEntry(id: $id) {
      id
      date
      place
      description
      image
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTravelEntries = /* GraphQL */ `
  query ListTravelEntries(
    $filter: ModelTravelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTravelEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        place
        description
        image
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
