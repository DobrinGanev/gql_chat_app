import React, {useState, useEffect, useRef} from "react"
import {Toast, ToastBody, ToastHeader} from "reactstrap"
import {useSubscription} from "@apollo/react-hooks"
import {MESSAGE_SENT_SUB} from "./queries"

const delay = (time = 2000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const ToastMessages = () => {
  const {data} = useSubscription(MESSAGE_SENT_SUB)
  const [toggle, setToggle] = useState(false)
  const unmounted = useRef(false)

  // a hook to track when the component is mounted/unmounted
  useEffect(() => {
    unmounted.current = false
    return () => {
      unmounted.current = true
    }
  }, [])

  useEffect(() => {
    const showToast = async () => {
      if (data) {
        setToggle(true)
        await delay()
        // there is a possibility that the component is unmounted
        // the user navigates to a different route
        if (!unmounted.current) {
          setToggle(true) // set the state only if the component is still mounted
        }
      }
    }
    showToast()
  }, [data]) //React does only shallow diffing.
  //the data of the mutation is a new object. so this effect runs every time data is received

  if (!data) {
    return null
  }
  return (
    <div className="p-3 my-2 rounded">
      {toggle && (
        <Toast>
          <ToastHeader>Message sent</ToastHeader>
          <ToastBody>
            {`Message ${data.messageSent.message} sent from user ${data.messageSent.email}  `}
          </ToastBody>
        </Toast>
      )}
    </div>
  )
}

export default ToastMessages
