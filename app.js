"use strict";
const graphql = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { GraphQLSchema } = graphql;
const { query } = require("./schemas/query");
// const { mutation } = require("./schemas/mutation");

const schema = new GraphQLSchema({
  query,
});

var app = express();
// app.use(
//   '/',
//   expressGraphQl({
//     schema: schema,
//     graphiql: true
//   })
// );
// Note: This code was written with an earlier version of express-graphql. Prior to v0.10.0, you could use var graphqlHTTP = require('express-graphql');. After v0.10.0, you need to use var { graphqlHTTP } = require('express-graphql');.
app.use("/", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(3000, () => console.log("GraphQL server running on localhost:3000"));
