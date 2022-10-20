import React, {Component} from 'react';
import Nav                from 'react-bootstrap/Nav';
import Navbar             from 'react-bootstrap/Navbar';
import Container          from 'react-bootstrap/Container';

class NavigationBar extends Component{
    render(){
        return (
            <Navbar expand="lg" bg="dark" className="mb-5">
                <Container>
                    <Nav>
                        <Nav.Link href="#home" className="text-white">Home</Nav.Link>
                        <Nav.Link href="#detail" className="text-white">Detail</Nav.Link>
                        <Nav.Link href="#address" className="text-white">Address</Nav.Link>
                        <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default NavigationBar;