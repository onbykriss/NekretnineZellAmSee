import { Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import StanoviService from "../../services/StanoviService";
import useLoading from "../../hooks/useLoading";

// **********************************************************************************************************
export default function StanoviDodaj() {

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    // *********************************************************************************************************
    async function Dodaj(e) {
        
        //console.log(stan)
        //console.log(JSON.stringify(stan))
        showLoading();
        const odgovor = await StanoviService.dodaj(e)
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.STANOVI_PREGLED)
    }

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target)

        Dodaj({
            kvadratura: parseFloat(podaci.get('kvadratura')),
            adresa: podaci.get('adresa'),
            oprema: podaci.get('oprema')
        })
    }

// **********************************************************************************************************
    return (
        <>
            Dodavanje novog Stana

            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="kvadratura">
                    <Form.Label>kvadratura</Form.Label>
                    <Form.Control type="number"step={0.01}name="kvadratura"required/>
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>adresa</Form.Label>
                    <Form.Control type="text"name="adresa"required/>
                </Form.Group>

                <Form.Group controlId="oprema">
                    <Form.Label>oprema</Form.Label>
                    <Form.Control type="text"name="oprema"required/>
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.STANOVI_PREGLED} 
                              className="btn btn-danger siroko">
                              Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                      <Button variant="primary" type="submit" className="siroko">
                         Dodaj novi stan
                      </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
