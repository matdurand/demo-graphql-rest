const { gql } = require('apollo-server');

const typeDefs = gql`
  type Dog {
    breed: String
    imageUrl: String
  }

  type Breed {
    name: String
    dogs(limit: Int): [Dog]
  }

  type Query {
    breed(breed: String!): Breed
    breeds(limit: Int): [Breed]
    dogs(breed: String!, limit: Int): [Dog]
  }
`;

module.exports = typeDefs;
