import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import StanoviService from "../../services/StanoviService";
import { useEffect, useState } from "react";

// *********************************************************************************************************

export default function StanoviPromjena() {
    const [stan, setStan] = useState({});
    const navigate = useNavigate();
    const routeParams = useParams();
   
    async function dohvatiStan() {
        console.log('Dohvačanje stana s šifrom:', routeParams.idstanovi);
        const odgovor = await StanoviService.getBySifra(routeParams.idstanovi);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setStan(odgovor.poruka);
        console.log('Dohvačanje osoba:', odgovor.poruka);
    }

    useEffect(() => {
        dohvatiStan();
    }, []);

// *********************************************************************************************************

    async function promjena(stan) {
        console.log('Promjena stana:', stan);
        const odgovor = await StanoviService.promjena(routeParams.idstanovi, stan); 
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.STANOVI_PREGLED);
    }

    function obradiSubmit(e) 
    {
      e.preventDefault();
      let podaci = new FormData(e.target);
      let stanZaPromjenu = 
        {
         kvadratura: parseFloat(podaci.get('kvadratura')),
         adresa: podaci.get('adresa'),
         oprema: podaci.get('oprema'),
         slika: podaci.get('slika')
        };
            console.log('Podaci za promjenu:', stanZaPromjenu); // Dodano za dijagnostiku
            promjena(stanZaPromjenu);        
    }

// *********************************************************************************************************

    return (
        <>
            Promjena stana
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="kvadratura">
                    <Form.Label>Kvadratura</Form.Label>
                    <Form.Control 
                    type="number" min={10} max={5000} 
                    name="kvadratura" 
                    required 
                    defaultValue={stan.kvadratura}/>
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="adresa" 
                    required 
                    defaultValue={stan.adresa}/>
                </Form.Group>

                <Form.Group controlId="oprema">
                    <Form.Label>Oprema</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="oprema" 
                    required 
                    defaultValue={stan.oprema}/>
                </Form.Group>

                <Form.Group controlId="slika">
                    <Form.Label>Slika</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="slika" 
                    
                    defaultValue={stan.slika}/>
                </Form.Group>
                <hr />
                <Row className="akcije">
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.STANOVI_PREGLED}
                            className="btn btn-danger siroko">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">
                            Promjeni stan
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}