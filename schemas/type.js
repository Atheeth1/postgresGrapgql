const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
  } = graphql;
  
  const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: () => ({
      id: { type: GraphQLID },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      emails: {
        type: new GraphQLList(EmailType),
        resolve(parentValue, args) {
          const query = `SELECT * FROM "emails" WHERE
              person=${parentValue.id}`;
          return db.conn
            .many(query)
            .then((data) => {
              return data;
            })
            .catch((err) => {
              return "The error is", err;
            });
        },
      },
    }),
  });
  const EmailType = new GraphQLObjectType({
    name: "Email",
    fields: {
      id: { type: GraphQLID },
      email: { type: GraphQLString },
      primary: { type: GraphQLBoolean },
    },
  });

  exports.EmailType = EmailType;
exports.PersonType = PersonType;