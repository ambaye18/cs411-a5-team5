import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {WiDayStormShowers} from 'react-icons/wi';
import {FaSearchLocation} from 'react-icons/fa';
import {FaRegUserCircle} from 'react-icons/fa';

export default function NavBar() {
    return (
        <Navbar bg="dark">
            <Container className="navContainer">
                <Navbar.Brand href="/"><WiDayStormShowers className="navIcon"/>Weather-Playlist Generator</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/search"><FaSearchLocation className="navIcon"/>Search</Nav.Link>
                    <Nav.Link href="/profile"><FaRegUserCircle className='navIcon'/>Profile</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}