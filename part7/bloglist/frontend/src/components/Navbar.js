/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { logoutUser } from '../reducers/userReducer';

const MyNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user) return null;

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Blog app</Navbar.Brand>
      <Nav className="mr-auto" variant="pills">
        <Nav.Item>
          <Nav.Link as={Link} to="/blogs">
            <Navbar.Text>
              blogs
            </Navbar.Text>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/users">
            <Navbar.Text>
              users
            </Navbar.Text>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {user.name}
          {' '}
          logged in
          {' '}
        </Navbar.Text>
        <Button variant="outline-secondary" size="sm" onClick={() => dispatch(logoutUser())}>log out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
