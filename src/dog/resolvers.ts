import { IContext } from "../context";
import { IResolvers } from "../generated-schema-types";

export default {
  Breed: {
    dogs(parent, args, { dataSources }) {
      return dataSources.dogApi.getDogsByBreed({
        breedId: parent.name,
        limit: args.limit
      });
    }
  },
  Dog: {
    breed(parent, _args, { dataSources }) {
      return dataSources.dogApi.getBreed(parent);
    }
  },
  Query: {
    breed(_parent, args, { dataSources }) {
      return dataSources.dogApi.getBreed({ breedId: args.breed });
    },
    breeds(_parent, args, { dataSources }) {
      return dataSources.dogApi.getBreeds({ limit: args.limit });
    },
    dogs(_parent, args, { dataSources }) {
      return dataSources.dogApi.getDogsByBreed({
        breedId: args.breed,
        limit: args.limit
      });
    }
  }
} as IResolvers<IContext>;
