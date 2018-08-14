const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const { getBreed, getBreeds, getDogsByBreed } = require('./dogApiClient');

const resolvers = {
  Query: {
    breed(obj, args) {
      return getBreed({ breed: args.breed });
    },
    breeds(obj, args) {
      return getBreeds({ limit: args.limit });
    },
    dogs(obj, args) {
      return getDogsByBreed({ breed: args.breed, limit: args.limit });
    }
  },
  Breed: {
    dogs(parent, args) {
      return getDogsByBreed({ breed: parent.name, limit: args.limit });
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🐶 server ready at ${url}`);
});
