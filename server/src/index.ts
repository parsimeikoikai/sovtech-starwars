import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import StarWarsAPI from "./datasource";
import path from "path";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.static("dist-client"));
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    starWarsAPI: new StarWarsAPI(),
  }),
});

server.applyMiddleware({ path: "/graphql", app });

// serve client files for all other requests
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "dist-client", "index.html"));
});

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000`);
});
