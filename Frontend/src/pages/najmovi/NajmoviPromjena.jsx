import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NajmoviService from "../../services/NajmoviService";
import { useEffect, useState } from "react";

export default function NaajmoviPromjena() {
    const navigate = useNavigate();
    const {idnajmovi} = useParams();
    const [najam, setNajam] = useState({});

    async function dohvatiNajam() {
        const odgovor = await NajmoviService.getBySifra(idnajmovi);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setNajam(odgovor.poruka);
    }

    useEffect(() => {
        dohvatiNajam();
    }, [idnajmovi]);

    async function promjena(najam) {
        const odgovor = await NajmoviService.promjena(idnajmovi, najam);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.NAJMOVI_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            datum: podaci.get('datum'),
            trajanje: parseInt(podaci.get('trajanje')),
            stanovi_idstanovi: parseInt(podaci.get('stanovi_idstanovi')),
            zakupci_Idzakupci: parseInt(podaci.get('zakupci_Idzakupci'))
        });
    }

    return (
        <>
            Promjena najma
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="datum" 
                    required 
                    defaultValue={najam.datum}/>
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Select 
                        name="trajanje"
                        required
                        defaultValue={Math.ceil(najam.trajanje / 30)}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                            <option value={month} key={month}>
                                {month} mjesec(a)
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="stanovi_idstanovi">
                    <Form.Label>Stan</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="stanovi_idstanovi" 
                    required 
                    defaultValue={najam.stanovi_idstanovi}/>
                </Form.Group>

                <Form.Group controlId="zakupci_Idzakupci">
                    <Form.Label>Zakupac</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="zakupci_Idzakupci" 
                    required 
                    defaultValue={najam.zakupci_Idzakupci}/>
                </Form.Group>
                <hr />
                <Row className="akcije">
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.NAJMOVI_PREGLED} 
                            className="btn btn-danger siroko">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">
                            Promijeni najam
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
