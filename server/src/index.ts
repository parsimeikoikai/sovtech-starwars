import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import StarWarsAPI from "./StarWarsAPI";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    starWarsAPI: new StarWarsAPI(),
  }),
});

// run apollo server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
