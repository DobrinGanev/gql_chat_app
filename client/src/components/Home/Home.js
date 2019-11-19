import React from "react"
import {Navbar, Nav, NavItem, Container} from "reactstrap"
import {Link} from "react-router-dom"
import "./styles.scss" // need node-sass to import and compile sass styles

const Welcome = () => {
  return (
    <>
      <Navbar className={"navbar-custom"} expand="md">
        <Nav className="ml-auto" navbar>
          <NavItem className={"mr-4"}>
            <Link to="/wellcome">Home</Link>
          </NavItem>
          <NavItem className={"mr-4"}>
            <Link to="/login">Login</Link>
          </NavItem>
          <NavItem className={"mr-4"}>
            <Link to="/chat">Chat</Link>
          </NavItem>
        </Nav>
      </Navbar>
      <Container>Wellcome!</Container>
    </>
  )
}

export default Welcome
