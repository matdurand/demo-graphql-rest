import { IResolvers, makeExecutableSchema } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default makeExecutableSchema({
  resolvers: resolvers as Array<IResolvers<any, any>>,
  typeDefs
});
