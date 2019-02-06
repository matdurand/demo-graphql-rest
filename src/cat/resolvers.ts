import { IContext } from "../context";
import { IResolvers } from "../generated-schema-types";

export default {
  Query: {
    cats(_parent, _args) {
      // Why would you want cats?
      return [
        {
          imageUrl: "no"
        }
      ];
    }
  }
} as IResolvers<IContext>;
