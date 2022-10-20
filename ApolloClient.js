import {
  ApolloClient,
  InMemoryCache
} from "@apollo/client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const HTTP_URL = "http://";
const WS_URL = "ws://";
const DEV_URL = "localhost:4000/graphql";

const httpLink = new HttpLink({
  uri: `${HTTP_URL}${DEV_URL}`,
});

const wsLink = new WebSocketLink({
  uri: `${WS_URL}${DEV_URL}`,
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kink =
      "OperationDefinition" && definition.operation === "subscription");
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
