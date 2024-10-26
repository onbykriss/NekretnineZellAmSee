import ZakupciService from "../../services/ZakupciService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";

//*********************************************************************************************************
export default function ZakupciPromjena(){
    const [zakupac,setZakupac] = useState({});
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
    
    //*********************************************************************************************************
    async function dohvatiZakupca(){
        showLoading();
        const odgovor = await ZakupciService.getBySifra(routeParams.Idzakupci);
        hideLoading();
        if (odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        try{
            const odgovor = await ZakupciService.getBySifra(routeParams.Idzakupci);
            if (odgovor.greska){
                console.error("Error dohvačanja zakupca", odgovor.poruka);
                alert(odgovor.poruka);
                return;
            }
            setZakupac(odgovor.poruka);
            console.log('Dohvaćanje zakupca:', odgovor.poruka);
        }
        catch (error){
            console.error("Error dohvačanja zakupca", error);
            alert('Problem kod dohvaćanja zakupca');
        }
    }

    //*********************************************************************************************************
    useEffect(()=>{
        dohvatiZakupca();
    }, []);

//*********************************************************************************************************
    async function promjena(zakupac){
        showLoading();
        const odgovor = await ZakupciService.promjena(routeParams.Idzakupci, zakupac);  
        hideLoading();
        if (odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.ZAKUPCI_PREGLED);
    }

    //*********************************************************************************************************
    function obradiSubmit(e) 
    { 
        e.preventDefault();
        let podaci = new FormData(e.target);
        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            telefon: podaci.get('telefon')
        });
       
    }
    
    //**********************************************************************************************************

    return(
        <>
            Promjena Zakupca

            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="ime" 
                    required defaultValue={zakupac.ime} />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="prezime" 
                    required 
                    defaultValue={zakupac.prezime} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="email" 
                    required 
                    defaultValue={zakupac.email} />
                </Form.Group>

                <Form.Group controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="telefon" 
                    required 
                    defaultValue={zakupac.telefon} />
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
                        <Button variant="primary" type="submit" className="siroko">
                            Promjeni zakupca
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}