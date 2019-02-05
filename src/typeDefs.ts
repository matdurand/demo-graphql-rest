/**
 * This file is required for generating types used in resolvers.
 * DO NOT import files that will use resolvers in this file.
 * Otherwise type generation will fail when the previous types are incorrect.
 */

import baseTypeDefs from "./base-types";
import catTypeDefs from "./cat/type.schema";
import dogTypeDefs from "./dog/type.schema";

export default [baseTypeDefs, catTypeDefs, dogTypeDefs];
