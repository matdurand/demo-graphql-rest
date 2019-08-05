import { POINT_CONVERSION_COMPRESSED } from "constants";
import { IResolvers } from "../generated-schema-types";

export default {
  Breed: {
    howManyDogs(parent, args, { dataSources }) {
      return dataSources.dogApi.getDogsCountByBreed({
        breed: parent.name
      });
    },
    dogs(parent, args, { dataSources }) {
      return dataSources.dogApi.getDogsByBreed({
        breed: parent.name,
        limit: args.limit
      });
    }
  },
  Dog: {
    breed(parent, _args, { dataSources }) {
      console.log(parent);
      return dataSources.dogApi.getBreed({ breed: parent.breedName });
    }
  },
  Query: {
    breed(_parent, args, { dataSources }) {
      return dataSources.dogApi.getBreed({ breed: args.breed });
    },
    breeds(_parent, args, z) {
      console.log("z:", z);
      const { dataSources } = z;
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
