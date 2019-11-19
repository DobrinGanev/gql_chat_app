import React, {useState} from "react"
import {useHistory, useLocation} from "react-router-dom"
import {useMutation} from "@apollo/react-hooks"
import {
  Button,
  Input,
  Spinner,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
} from "reactstrap"
import {LOGIN_MUTATION} from "./queries"

const LoginPage = () => {
  const [email, setEmail] = useState("")

  // router hooks
  const history = useHistory()
  const location = useLocation()

  const [login, {loading, error}] = useMutation(LOGIN_MUTATION, {
    onCompleted({login}) {
      // the mutation is completed save the token in the local storage
      const {from} = location.state || {from: {pathname: "/"}}
      localStorage.setItem("chat_token", login)
      history.replace(from)
    },
  })
  const onInputChange = event => {
    const email = event.target.value
    setEmail(email)
  }
  // loading is when the query is in flight state. and the error is network/server error
  return (
    <>
      {loading && <Spinner color="primary" />}
      {error && <div> Error!!!</div>}
      <Container className={"mt-4"}>
        <Row>
          <Col />
          <Col>
            <Card body>
              <CardTitle>Enter your email</CardTitle>
              <Input
                onChange={onInputChange}
                value={email}
                placeholder="Email"
              />
              <Button
                className={"mt-4"}
                onClick={() => login({variables: {email: email}})}
              >
                Submit
              </Button>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  )
}

export default LoginPage
