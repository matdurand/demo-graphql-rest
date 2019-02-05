export default `
# Why would you want cats?
type Cat {
  imageUrl: String!
}

extend type Query {
  cats: [Cat!]
}
`;
