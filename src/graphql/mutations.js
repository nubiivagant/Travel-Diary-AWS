/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTravelEntry = /* GraphQL */ `
  mutation CreateTravelEntry(
    $input: CreateTravelEntryInput!
    $condition: ModelTravelEntryConditionInput
  ) {
    createTravelEntry(input: $input, condition: $condition) {
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
export const updateTravelEntry = /* GraphQL */ `
  mutation UpdateTravelEntry(
    $input: UpdateTravelEntryInput!
    $condition: ModelTravelEntryConditionInput
  ) {
    updateTravelEntry(input: $input, condition: $condition) {
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
export const deleteTravelEntry = /* GraphQL */ `
  mutation DeleteTravelEntry(
    $input: DeleteTravelEntryInput!
    $condition: ModelTravelEntryConditionInput
  ) {
    deleteTravelEntry(input: $input, condition: $condition) {
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
