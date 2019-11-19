const initialState = {
  users: [],
}

// reducer function to deal with our state
const reducer = (state = initialState, action) => {
  let newState = state
  switch (action.type) {
    case "FIND_OR_CREATE_USER": {
      const user = newState.users.filter(user => user.email === action.payload)
      if (!user.length) {
        const newUser = {
          email: action.payload,
          messages: [
            {
              email: action.payload,
              message: `user ${action.payload} joined the chat`,
            },
          ],
        }
        const users = [].concat(newState.users, newUser)
        newState = {
          ...newState,
          users,
        }
      }
      return newState
    }
    case "INSERT_MESSAGE": {
      const user = newState.users.filter(
        user => user.email === action.payload.email
      )[0]

      if (!user) {
        return newState
      }
      const newUser = {
        ...user,
        messages: [...user.messages, action.payload],
      }
      const users = newState.users.filter(
        user => user.email !== action.payload.email
      )
      const newUsers = [].concat(users, newUser)
      newState = {
        ...newState,
        users: newUsers,
      }
      return newState
    }
    default: {
      return newState
    }
  }
}

module.exports = reducer
