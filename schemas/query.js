const graphql = require("graphql");
const connectionString = "myURI";
const pgp = require("pg-promise")();
const db = {};
db.conn = pgp(connectionString);
const { PersonType, EmailType } = require("./type");
const { GraphQLObjectType, GraphQLID, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM "people" WHERE id=${args.id}`;
        return db.conn
          .one(query)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return "The error is", err;
          });
      },
    },
    emails: {
      type: EmailType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM "emails" WHERE id=${args.id}`;
        return db.conn
          .one(query)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return "The error is", err;
          });
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
