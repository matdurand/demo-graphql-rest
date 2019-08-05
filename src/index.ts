const { ApolloServer } = require("apollo-server-express");
const swaggerUi = require("swagger-ui-express");
const express = require("express");

import { OpenAPI, useSofa } from "sofa-api";
import getDataSources from "./data-sources";
import schema from "./schema";

import winston from "winston";
winston.level = "debug";
winston.add(new winston.transports.Console());

import { InMemoryLRUCache } from "apollo-server-caching";
const cache = new InMemoryLRUCache(); // In order to share cache with Apollo Server

const app = express();
const options = {
  dataSources: getDataSources,
  schema,
  cache
};
const server = new ApolloServer(options);
server.applyMiddleware({ app });

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
    context: ({ req }) => {
      const dataSources = getDataSources() as any;
      const context = { req, dataSources };
      // This is what Apollo does internally
      for (const dataSource of Object.values(dataSources) as any) {
        if (dataSource.initialize) {
          dataSource.initialize({
            context,
            cache
          });
        }
      }
      return context;
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
app.use("/", swaggerUi.serve, swaggerUi.setup(openApi.get()));

app.listen(4000, () => {
  const url = `http://localhost:${4000}`;
  console.log(url);
});
