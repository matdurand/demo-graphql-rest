import { ApolloServer } from "apollo-server";

import getDataSources from "./data-sources";
import schema from "./schema";

const server = new ApolloServer({
  dataSources: getDataSources,
  schema
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🐶 GraphQL server ready at ${url}`);
});
