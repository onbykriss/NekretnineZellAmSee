import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';
import { APP_URL } from '../constants';

export default function NavBarNekretnine() {
   const navigate = useNavigate()
   
   function OpenSwaggerURL(){
    window.open(APP_URL + "/swagger/index.html", "_blank")
  }



  return (
    <>
      {['xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand className='ruka'
            onClick={()=>navigate(RouteNames.HOME)}>Nekretnine APP</Navbar.Brand>
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  NekretnineZellAmSee App
                </Offcanvas.Title>

              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                   <Nav.Link onClick={()=>OpenSwaggerURL()}>Swagger</Nav.Link>
                    <NavDropdown title="Nekretnine" id="basic-nav-dropdown">
                     <NavDropdown.Item onClick={()=>navigate(RouteNames.STANOVI_PREGLED)}>Stanovi</NavDropdown.Item>
                     <NavDropdown.Item onClick={()=>navigate(RouteNames.ZAKUPCI_PREGLED)}>Zakupci</NavDropdown.Item>
                     <NavDropdown.Item onClick={()=>navigate(RouteNames.NAJMOVI_PREGLED)}>Najmovi</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
               <Form className="d-flex">
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}