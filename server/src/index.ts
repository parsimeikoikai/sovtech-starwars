import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = new ApolloServer({ typeDefs, resolvers });

// run apollo server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
