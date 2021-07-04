import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({ cache, link });

const App = () => {
  return <div>Hello Starwars</div>;
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
