import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import ZakupciService from "../../services/ZakupciService";
import useLoading from "../../hooks/useLoading";

// *********************************************************************************************************
export default function ZakupciDodaj(){
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function dodaj(e){
        showLoading();
        const odgovor = await ZakupciService.dodaj(e);
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.ZAKUPCI_PREGLED);
    }
    function obradiSubmit(e){ 
        e.preventDefault();
        const podaci = new FormData(e.target);
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            telefon: podaci.get('telefon'),
        });
    }

    // **********************************************************************************************************
    return(
        <>
            Dodavanje novog Zakupca
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="ime" 
                    required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="prezime" 
                    required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="email" 
                    required />
                </Form.Group>

                <Form.Group controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="telefon" 
                    required />
                </Form.Group>
             
                <hr />
                <Row className="akcije">
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                       <Link to={RouteNames.ZAKUPCI_PREGLED}
                         className="btn btn-danger siroko">
                         Odustani
                       </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">
                          Dodaj novog zakupca
                       </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}