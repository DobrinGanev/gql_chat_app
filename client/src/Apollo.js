import React from "react"
import {ApolloClient} from "apollo-client"
import {InMemoryCache} from "apollo-cache-inmemory"
import {createHttpLink} from "apollo-link-http"
import {WebSocketLink} from "apollo-link-ws"
import {setContext} from "apollo-link-context"
import {getMainDefinition} from "apollo-utilities"
import {split} from "apollo-link"
import {ApolloProvider} from "@apollo/react-hooks"

const GRAPHQL_ENDPOINT = "localhost:4000/graphql" // this can be moved to .env file
// this app is done with CRA and all env variables should start with REACT_APP_
// this could be REACT_APP_GRAPHQL_ENDPOINT
// then access it like this process.env.REACT_APP_GRAPHQL_ENDPOINT

const httpLink = createHttpLink({
  uri: `http://${GRAPHQL_ENDPOINT}`,
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("chat_token")
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  }
})
const wsLink = new WebSocketLink({
  uri: `ws:${GRAPHQL_ENDPOINT}`,
  headers: {
    authorization: localStorage.getItem("chat_token"),
    "client-name": "Space Explorer [web]",
    "client-version": "1.0.0",
  },
  options: {
    reconnect: true,
    connectionParams: async () => {
      // this will be available on the server events. onConnect, onDisconnect...
      const token = localStorage.getItem("chat_token")
      return {
        auth: token ? token : "",
      }
    },
  },
})
const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const Apollo = props => {
  // provider pattern. all children components can access the client using useContext
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}

export default Apollo
