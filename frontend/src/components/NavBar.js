import React from 'react';
// import {useNavigate} from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand href="/">CS411 A5 Team 5</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/search">Search</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}