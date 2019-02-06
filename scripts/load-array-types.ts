import { makeExecutableSchema } from "graphql-tools";
import path from "path";

/**
 * A custom loader for GraphQL Code Generator
 * https://graphql-code-generator.com/docs/getting-started/schema-field#custom-schema-loader
 * Supports returning array of typeDefs
 */

export default (schemaString: string) => {
  const typeDefs = require(path.join(process.cwd(), schemaString)).default;
  return makeExecutableSchema({ typeDefs });
};
