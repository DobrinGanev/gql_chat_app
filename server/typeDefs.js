// graphql type definitions.
const typeDefs = `
type Message {
  email: ID!
  message: String!
}
type User {
  email: String!
  messages:[Message]
}

type Query {
  messages: [Message]
  users: [User]
}

input MessageInput {
  email: ID!
  message: String!
}

type Mutation {
  sendMessage(input: MessageInput!): Message
  login(email: String): String 
}

type Subscription {
  messageSent: Message
}
`
module.exports = {typeDefs}
