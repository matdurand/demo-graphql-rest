const { ApolloServer } = require("apollo-server-express");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import {
  convertNodeHttpToRequest,
  HttpQueryError,
  runHttpQuery
} from "apollo-server-core";

import { resolve } from "path";
import { OpenAPI, useSofa } from "sofa-api";
import getDataSources from "./data-sources";
import schema from "./schema";

import winston from "winston";
winston.level = "debug";
winston.add(new winston.transports.Console());

const app = express();
const options = {
  dataSources: getDataSources,
  schema
};
const server = new ApolloServer(options);
server.applyMiddleware({ app });

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://localhost:4000/graphql", fetch }),
  cache: new InMemoryCache()
});

const openApi = OpenAPI({
  schema,
  info: {
    title: "Example API",
    version: "3.0.0"
  }
});
app.use(
  useSofa({
    schema,
    async execute(args) {
      console.log("exec", args.source);
      client.query({
        query: args.source
      });
      return null;
    },
    errorHandler(res: any, errors: ReadonlyArray<any>) {
      console.log(errors);
      res.status(500);
      res.json(errors[0]);
    },
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: ""
      });
    }
  })
);
console.log(openApi.get());
app.use("/", swaggerUi.serve, swaggerUi.setup(openApi.get()));

app.listen(4000, () => {
  const url = `http://localhost:${4000}`;
  console.log(url);
});
