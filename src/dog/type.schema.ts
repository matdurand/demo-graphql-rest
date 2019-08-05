import gql from "graphql-tag";

export default gql`
  type Dog {
    breed: Breed
    imageUrl: String!
  }

  type Breed {
    name: String!
    howManyDogs: String!
    dogs(limit: Int): [Dog!]
  }

  type Query {
    breed(breed: String!): Breed
    breeds(limit: Int): [Breed!]
    dogs(breed: String!, limit: Int): [Dog!]
  }

  schema {
    query: Query
  }
`;
