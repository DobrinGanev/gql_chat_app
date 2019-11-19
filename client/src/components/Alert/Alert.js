import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react"
import {Alert} from "reactstrap"
export const AlertContext = createContext(null)

const delay = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const AlertNotification = props => {
  const [alert, setAlert] = useState({
    show: false,
    text: "",
    color: "primary",
  })
  const unmounted = useRef(false)

  useEffect(() => {
    unmounted.current = false
    return () => {
      unmounted.current = true
    }
  }, [])

  const showAlert = useCallback(
    (text, color) => {
      const show = async () => {
        setAlert({
          ...alert,
          text: text,
          color: color,
          show: true,
        })
        await delay(5000)
        if (!unmounted.current) {
          setAlert({
            ...alert,
            show: false,
          })
        }
      }
      show()
    },
    [alert]
  )

  return (
    <AlertContext.Provider value={{showAlert}}>
      {alert.show && (
        <div
          style={{
            position: "absolute",
            bottom: "100px",
            right: "100px",
          }}
        >
          <Alert color={alert.color}>{alert.text}</Alert>
        </div>
      )}
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertNotification
