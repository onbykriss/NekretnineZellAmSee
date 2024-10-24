import NajmoviService from "../../services/NajmoviService";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { TbDecimal } from "react-icons/tb";
import useLoading from "../../hooks/useLoading";

// **********************************************************************************************************
export default function NajmoviDodaj() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function Dodaj(najam) {

        const odgovor = await NajmoviService.dodaj(najam)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.NAJMOVI_PREGLED)
    }

    async function obradiSubmit(e) {
        showLoading();
        e.preventDefault();
        let podaci = new FormData(e.target)
        hideLoading();
        Dodaj({
            idstanovi: parseInt(podaci.get('idstanovi')),
            idzakupci: parseInt(podaci.get('idzakupci')),
            datumPocetka: podaci.get('datumPocetka'),
            datumZavrsetka: podaci.get('datumZavrsetka'),
            cijenaNajma: parseFloat(podaci.get('cijenaNajma'))
        })
    }

    // **********************************************************************************************************
    return (
        <>
            Dodavanje Najmova
            
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="idstanovi">
                    <Form.Label>stanovi_idstanovi</Form.Label>
                    <Form.Control
                        type="number"
                        name="idstanovi"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="idzakupci">
                    <Form.Label>zakupci_Idzakupci</Form.Label>
                    <Form.Control
                        type="number"
                        name="idzakupci"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="datumPocetka">
                    <Form.Label>Datum početka</Form.Label>
                    <Form.Control
                        type="date"
                        name="datumPocetka"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="datumZavrsetka">
                    <Form.Label>Datum završetka</Form.Label>
                    <Form.Control
                        type="date"
                        name="datumZavrsetka"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="cijenaNajma">
                    <Form.Label>Cijena najma</Form.Label>
                    <Form.Control
                        type="number"
                        name="cijenaNajma"
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
