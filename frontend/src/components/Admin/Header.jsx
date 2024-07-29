import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import medicineImage from "../../assets/Images/logo.png";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/dashboard">
          {" "}
          <img src={medicineImage} alt="Medicine" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>

          <NavDropdown title="Admin" id="navbarScrollingDropdown" className='header_dropdown'>
            <NavDropdown.Item href="#action3">My Account </NavDropdown.Item>
            <NavDropdown.Item href="#action4"> Edit My Account </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
            Logout 
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header


