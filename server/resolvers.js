const {PubSub} = require("apollo-server")
const pubsub = new PubSub()

// resolver functions
const resolvers = {
  Query: {
    messages: async (parent, args, context, info) => {
      const store = await context.db.selectAll() // we get the db connection from the context
      const messages = store.users.map(user => {
        return user.messages
      })
      return messages[0]
    },
    users: async (parent, args, context, info) => {
      const store = await context.db.selectAll()
      return store.users
    },
  },
  User: {
    messages: async (parent, args, context, info) => {
      const store = await context.db.selectAll()
      const user = store.users.filter(user => user.email === parent.email)[0]
      return user.messages
    },
  },
  Mutation: {
    sendMessage: async (parent, args, context, info) => {
      const message = args.input
      // when the message is inserted
      // publish the event MESSAGE_SENT
      context.db.insertMessage(message)
      pubsub.publish("MESSAGE_SENT", {
        messageSent: message,
      })
      return message
    },
    login: async (parent, args, context, info) => {
      const email = args.email
      const user = await context.db.findOrCreateUser(email)
      if (user) {
        return JSON.stringify({
          // JWT can be used instead of this naive token
          token: Buffer.from(user).toString("base64"),
          email: email,
        })
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(["MESSAGE_SENT"]),
    },
  },
}

module.exports = {
  resolvers,
}
