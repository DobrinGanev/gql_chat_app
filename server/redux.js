// the bare minimum of redux create store
const createStore = reducer => {
  let state
  let listeners = []
  const getState = () => state
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(item => l !== item)
    }
  }
  return {getState, dispatch, subscribe}
}

module.exports = createStore
