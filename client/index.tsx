import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import Details from "./src/pages/Details";

const cache = new InMemoryCache();
const uri = process.env.NODE_ENV === 'development' ? "http://localhost:4000/graphql" : '/graphql';
const link = new HttpLink({
  uri
});

const client = new ApolloClient({ cache, link });

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/details/:name" component={Details} />
    </Switch>
  </BrowserRouter>;
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
