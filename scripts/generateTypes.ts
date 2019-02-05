// Generates GraphQL Types from Schema

import { printSchema } from "graphql";
import { generateTypeScriptTypes } from "graphql-schema-typescript";
import { buildSchemaFromTypeDefinitions } from "graphql-tools";

import typeDefs from "../src/typeDefs";

// Parse then print the schema to merge in all extended types
const schema = printSchema(buildSchemaFromTypeDefinitions(typeDefs));

generateTypeScriptTypes(schema, "src/generated-schema-types.ts", {
  asyncResult: true,
  smartTParent: true,
  smartTResult: true
})
  .then(() => {
    console.log("Successfully generated TypeScript types from schemas");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error generating TypeScript types from schemas");
    console.error(err);
    process.exit(1);
  });
