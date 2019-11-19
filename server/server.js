const {ApolloServer} = require("apollo-server-express")
const express = require("express")
const {createServer} = require("http")
const {typeDefs} = require("./typeDefs")
const {resolvers} = require("./resolvers")
const {memDB} = require("./memDB")

const app = express()
const server = new ApolloServer({
  typeDefs, // the gql schema
  resolvers,
  subscriptions: {
    onConnect: async (connectionParams, webSocket, context) => {
      // auth happening here, we can notify all users that someone was connected
    },
    onDisconnect: async (webSocket, context) => {
      /* 
       notify all users that this user got disconnected
       get the user like this:
       const initialContext = await context.initPromise
       const {user} = initialContext
      */
    },
  },
  context: async ({req}) => {
    /*
     connect to the db. this should be a singleton instance, if not
     it will re-create the db connection on every query.

    */
    const db = await memDB().connect()
    if (!req) {
      return {db}
    }
    const token = req.headers.authorization
    if (token) {
      // get the email from the token
      const email = Buffer.from(JSON.parse(token).token, "base64").toString(
        "ascii"
      )
      const user = await db.getUserByEmail(email)
      // we have the user in our memDB
      if (user.length) {
        return {db, user} // this will add the user to the context,
        //then we can have authorization per query.
      }
    }
    return {db} // return the db to the context and make it available to all resolvers
  },
})
server.applyMiddleware({app, path: "/graphql"})

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)
const PORT = 4000 // this can be in .env file and use something like 'dotenv' package to load it

httpServer.listen({port: PORT}, () => {
  console.log(`Apollo Server listens on http://localhost:${PORT}/graphql`)
})
