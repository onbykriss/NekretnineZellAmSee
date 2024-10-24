import StanoviService from "../../services/StanoviService";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import useLoading from "../../hooks/useLoading";

// **********************************************************************************************************
export default function StanoviDodaj() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function Dodaj(stan) {
        
        //console.log(stan)
        //console.log(JSON.stringify(stan))
        showLoading();
        const odgovor = await StanoviService.dodaj(stan)
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.STANOVI_PREGLED)
    }

    function obradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target)
        Dodaj({
            kvadratura: parseFloat(podaci.get('kvadratura')),
            adresa: podaci.get('adresa'),
            oprema: podaci.get('oprema'),
            slika: podaci.get('slika')
        })
    }

// **********************************************************************************************************
    return (
        <>
            Dodavanje Stanova

            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="kvadratura">
                    <Form.Label>kvadratura</Form.Label>
                    <Form.Control
                        type="number"
                        step={0.01}
                        name="kvadratura"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>adresa</Form.Label>
                    <Form.Control
                        type="text"
                        name="adresa"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="oprema">
                    <Form.Label>oprema</Form.Label>
                    <Form.Control
                        type="text"
                        name="oprema"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="slika">
                    <Form.Label>slika</Form.Label>
                    <Form.Control
                        type="text"
                        name="slika"
                    />
                </Form.Group>
                
                <hr />
                <Row className="akcije">
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.STANOVI_PREGLED} 
                              className="btn btn-danger">
                              Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                      <Button variant="success" type="submit" className="siroko">
                         Dodaj stan
                      </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
