import { IResolvers } from "../generated-schema-types";

export default {
  Breed: {
    dogs(parent, args, { dataSources }) {
      return dataSources.dogApi.getDogsByBreed({
        breed: parent.name,
        limit: args.limit
      });
    }
  },
  Dog: {
    breed(parent, _args, { dataSources }) {
      return dataSources.dogApi.getBreed({ breed: parent.breedName });
    }
  },
  Query: {
    breed(_parent, args, { dataSources }) {
      return dataSources.dogApi.getBreed({ breed: args.breed });
    },
    breeds(_parent, args, { dataSources }) {
      return dataSources.dogApi.getBreeds({ limit: args.limit });
    },
    dogs(_parent, args, { dataSources }) {
      return dataSources.dogApi.getDogsByBreed({
        breed: args.breed,
        limit: args.limit
      });
    }
  }
} as IResolvers;
