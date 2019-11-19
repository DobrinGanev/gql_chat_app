import React, {useContext, useEffect, useRef, useState} from "react"
import {useMutation} from "@apollo/react-hooks"
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap"
import {AlertContext} from "../Alert"
import Messages from "./Messages"
import {SEND_MESSAGE_MUTATION} from "./queries"
import ToastMessages from "./ToastMessages"

const Chat = () => {
  const {showAlert} = useContext(AlertContext)

  const showAlertRef = useRef(showAlert) // this hack is nessesary
  // eiter do it this way or get rid of the exhaustive-deps link rule
  // and remove it from the dependency array in the useEffect

  const [message, setMessage] = useState("")
  const user = useRef(null)

  useEffect(() => {
    showAlertRef.current = showAlert
    const loggedinUser = localStorage.getItem("chat_token")
    user.current = JSON.parse(loggedinUser)
  }, [showAlert])

  useEffect(() => {
    showAlertRef.current(`Hello ${user.current.email} !`, "info")
  }, []) // this hook runs only when the component is mounted

  const [sendMessage, {loading}] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted() {
      setMessage("") // clear the message
    },
  })
  const sendChatMessage = () => {
    sendMessage({
      variables: {
        // passing variables
        input: {
          email: user.current.email,
          message: message,
        },
      },
    })
  }

  const onInputChange = event => {
    const message = event.target.value
    setMessage(message)
  }

  return (
    <Container>
      <Row>
        <Col>
          {loading && <Spinner color="primary" />}
          <Messages message={message} />
          <FormGroup className={"mt-4"}>
            <Input
              type="textarea"
              onChange={onInputChange}
              name="message"
              value={message}
              id="chatTextArea"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={sendChatMessage}>Send</Button>
        </Col>
      </Row>
      <ToastMessages />
    </Container>
  )
}

export default Chat
