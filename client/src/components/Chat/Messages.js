import React, {useRef, useLayoutEffect} from "react"
import {useQuery} from "@apollo/react-hooks"
import {USERS} from "./queries"
import {Card, CardBody, Spinner, CardTitle} from "reactstrap"
import UserIcon from "./UserIcon"

const Messages = () => {
  const el = useRef(null)
  const {loading, data} = useQuery(USERS, {
    pollInterval: 500, // polling is the easiest way to create a realtime app
  })

  const scrollToBottom = () => {
    if (el && el.current) {
      el.current.scrollTop = el.current.scrollHeight - el.current.clientHeight
    }
  }

  useLayoutEffect(() => {
    scrollToBottom()
  }, [data]) // scroll to the bottom when data is received

  if (!data) {
    return null
  }

  return (
    <Card className={"mt-4"}>
      <CardBody>
        <div ref={el} style={{height: "400px", overflowY: "scroll"}}>
          {loading && <Spinner color="primary" />}
          {data.users.map(user => {
            const messages = user.messages.map((item, index) => {
              return <div key={index}>{item.message}</div>
            })
            return (
              <Card className={"mt-4"} key={user.email}>
                <CardTitle>
                  <UserIcon></UserIcon> {user.email}
                </CardTitle>
                <CardBody className={"mt-4"}>{messages}</CardBody>
              </Card>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}

export default Messages
