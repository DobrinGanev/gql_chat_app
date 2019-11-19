import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Chat from "./components/Chat"
import Apollo from "./Apollo"
import Alert from "./components/Alert" // alert exposes showAlert all the components

const PrivateRoute = ({children, ...rest}) => {
  // if there is no chat_token in the localStorage redirect to the login page
  //
  return (
    <Route
      {...rest}
      render={({location}) =>
        !!localStorage.getItem("chat_token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location},
            }}
          />
        )
      }
    />
  )
}
const App = () => {
  return (
    <Apollo>
      <Router>
        <Switch>
          <Alert>
            <Route path="*">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/chat">
              <Chat />
            </PrivateRoute>
          </Alert>
        </Switch>
      </Router>
    </Apollo>
  )
}

export default App
