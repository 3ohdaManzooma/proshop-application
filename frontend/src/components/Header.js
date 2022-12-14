import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from "../action/userAction";

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogIn);

  const {userInfo} = userLogin;
  const logoutHandler = () => {
   dispatch(logout())
  }
  return <header>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to='/cart'>
              <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : <LinkContainer to="/login">
              <Nav.Link ><i className="fas fa-user"></i>Sign In</Nav.Link>
            </LinkContainer>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </header>
}


export default Header;