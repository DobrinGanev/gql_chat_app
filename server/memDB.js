const createStore = require("./redux")
const reducer = require("./reducer")
/*
 memory db
*/

// some delay to simulate network delays
const delay = (time = 500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// actions
const insertMessageAction = message => {
  return {
    type: "INSERT_MESSAGE",
    payload: message,
  }
}

const findOrCreateUserAction = email => {
  return {
    type: "FIND_OR_CREATE_USER",
    payload: email,
  }
}

const store = createStore(reducer)
store.dispatch({type: "@@@INIT"}) // dispatch init action to boot to the initial state

store.subscribe(() => {}) // this is called on every dispatch.

const memDB = () => {
  // some API
  const getUserByEmail = async email => {
    const res = store.getState().users.filter(user => user.email === email)
    return res
  }

  const insertMessage = async item => {
    store.dispatch(
      insertMessageAction({email: item.email, message: item.message})
    )
  }

  const selectAll = async () => {
    // looks more realistic if has some delay
    await delay(100)
    return store.getState()
  }

  const findOrCreateUser = email => {
    store.dispatch(findOrCreateUserAction(email)) // Like in redux only actions can trigger state change
    return email
  }

  const connect = async () => {
    await delay(10)
    // once we are connected we return all the available functions
    return {
      connect,
      insertMessage,
      getUserByEmail,
      findOrCreateUser,
      selectAll,
    }
  }

  return {connect, insertMessage, getUserByEmail, findOrCreateUser, selectAll}
}
module.exports = {memDB}
