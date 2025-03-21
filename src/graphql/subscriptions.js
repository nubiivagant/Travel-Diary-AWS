/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTravelEntry = /* GraphQL */ `
  subscription OnCreateTravelEntry(
    $filter: ModelSubscriptionTravelEntryFilterInput
    $owner: String
  ) {
    onCreateTravelEntry(filter: $filter, owner: $owner) {
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
export const onUpdateTravelEntry = /* GraphQL */ `
  subscription OnUpdateTravelEntry(
    $filter: ModelSubscriptionTravelEntryFilterInput
    $owner: String
  ) {
    onUpdateTravelEntry(filter: $filter, owner: $owner) {
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
export const onDeleteTravelEntry = /* GraphQL */ `
  subscription OnDeleteTravelEntry(
    $filter: ModelSubscriptionTravelEntryFilterInput
    $owner: String
  ) {
    onDeleteTravelEntry(filter: $filter, owner: $owner) {
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
