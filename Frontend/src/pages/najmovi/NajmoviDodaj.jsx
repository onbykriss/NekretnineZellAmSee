import NajmoviService from "../../services/NajmoviService";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function NajmoviDodaj() {
    
    const navigate = useNavigate();

    async function Dodaj(najam) {
  


        const odgovor = await NajmoviService.dodaj(najam)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.NAJMOVI_PREGLED)
    }

    async function obradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target)
        Dodaj({
            datum: podaci.get('datum'),
            trajanje: parseInt(podaci.get('trajanje')),
            stanovi_idstanovi: parseInt(podaci.get('stanovi_idstanovi')),
            zakupci_Idzakupci: parseInt(podaci.get('zakupci_Idzakupci'))
        })
    }

    return (
        <>
            Dodavanje Najmova
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="datum">
                    <Form.Label>datum</Form.Label>
                    <Form.Control
                        type="date"
                        name="datum"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>trajanje</Form.Label>
                    <Form.Control
                        type="number"
                        name="trajanje"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="stanovi_idstanovi">
                    <Form.Label>stanovi_idstanovi</Form.Label>
                    <Form.Control
                        type="number"
                        name="stanovi_idstanovi"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="zakupci_Idzakupci">
                    <Form.Label>zakupci_Idzakupci</Form.Label>
                    <Form.Control
                        type="number"
                        name="zakupci_Idzakupci"
                        required
                    />
                </Form.Group>



                <Row className="akcije">
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.NAJMOVI_PREGLED} className="btn btn-danger">
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
