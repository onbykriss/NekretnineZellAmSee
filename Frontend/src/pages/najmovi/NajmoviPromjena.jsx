import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RouteNames } from "../../constants";
import StanoviService from "../../services/StanoviService";
import { useEffect, useState, useRef } from "react";

// Import useLoading only once
import useLoading from "../../hooks/useLoading";

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


// *********************************************************************************************************

export default function NajmoviPromjena() {
    const navigate = useNavigate();
    const {idnajmovi} = useParams();
    const [najam, setNajam] = useState({});
    const { showLoading, hideLoading } = useLoading();

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

// *********************************************************************************************************

    async function promjena(najam) {
        showLoading();
        const odgovor = await NajmoviService.promjena(idnajmovi, najam);
        hideLoading();
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
            idstanovi: parseInt(podaci.get('idstanovi')),
            idzakupci: parseInt(podaci.get('idzakupci')),
            datumPocetka: podaci.get('datumPocetka'),
            datumZavrsetka: podaci.get('datumZavrsetka'),
            cijenaNajma: parseFloat(podaci.get('cijenaNajma'))
        });
    }

// *********************************************************************************************************

    return (
        <>
            Promjena najma
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="datumPocetka">
                    <Form.Label>Datum početka</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="datumPocetka" 
                    required 
                    defaultValue={najam.datumPocetka}/>
                </Form.Group>

                <Form.Group controlId="datumZavrsetka">
                    <Form.Label>Datum završetka</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="datumZavrsetka" 
                    required 
                    defaultValue={najam.datumZavrsetka}/>
                </Form.Group>

                <Form.Group controlId="cijenaNajma">
                    <Form.Label>Cijena najma</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="cijenaNajma" 
                    required 
                    defaultValue={najam.cijenaNajma}/>
                </Form.Group>
                
                <Form.Group controlId="idstanovi">
                    <Form.Label>Stan</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="idstanovi" 
                    required 
                    defaultValue={najam.idstanovi}/>
                </Form.Group>

                <Form.Group controlId="idzakupci">
                    <Form.Label>Zakupac</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="idzakupci" 
                    required 
                    defaultValue={najam.idzakupci}/>
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
