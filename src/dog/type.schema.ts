export default `
  type Dog {
    breed: Breed
    imageUrl: String!
  }

  type Breed {
    name: String!
    dogs(limit: Int): [Dog!]
  }

  extend type Query {
    breed(breed: String!): Breed
    breeds(limit: Int): [Breed!]
    dogs(breed: String!, limit: Int): [Dog!]
  }
`;
