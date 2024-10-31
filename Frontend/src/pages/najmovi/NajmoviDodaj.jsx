import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RouteNames } from "../../constants";
import NajmoviService from "../../services/NajmoviService";
import { useEffect, useState } from "react";
import moment from "moment";
import StanoviService from '../../services/StanoviService';
import ZakupciService from '../../services/ZakupciService';
import useLoading from "../../hooks/useLoading";


// **********************************************************************************************************
export default function NajmoviDodaj() {
    const navigate = useNavigate();
    const {idnajmovi} = useParams();
    const [najam, setNajam] = useState({});
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
    
    const [stanovi, setStanovi] = useState([]);
    const [stanSifra, setStanSifra] = useState(0);
    const [zakupci, setZakupci] = useState([]);
    const [zakupacSifra, setZakupacSifra] = useState(0);
   
   
    // **********************************************************************************************************
    async function dohvatiStanove(){
        const odgovor = await StanoviService.get();
        setStanovi(odgovor);}

      async function dohvatiZakupce(){
        const odgovor = await ZakupciService.get();
        setZakupci(odgovor);}
    
    
        useEffect(() => {
            dohvatiStanove();
            dohvatiZakupce();
    
        }, []);


    // **********************************************************************************************************
    
    async function dodaj(najam) {
        showLoading();

        if (!najam.idstanovi || najam.idstanovi === '') {
            alert("Molimo odaberite stan");
            return;
        }


        const odgovor = await NajmoviService.dodaj(najam);
        hideLoading();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.NAJMOVI_PREGLED)
    }

    // **********************************************************************************************************
    async function obradiSubmit(e) {
        e.preventDefault();
        
        console.log("Stanje zakupacSifra prije slanja:", zakupacSifra);
       
        if (!zakupacSifra || zakupacSifra === 0) {
            alert("Molimo odaberite zakupca");
            return;
          }
        
        const podaci = new FormData(e.target)
        
        console.log("Podaci za slanje:",{
            idstanovi: parseInt(stanSifra),
            idzakupci: parseInt(zakupacSifra),
            datumPocetka: podaci.get('datumPocetka'),
            datumZavrsetka: podaci.get('datumZavrsetka'),
            cijenaNajma: parseFloat(podaci.get('cijenaNajma'))
        });
    
        dodaj({
            idstanovi: parseInt(stanSifra),
            idzakupci: parseInt(zakupacSifra),
            datumPocetka: podaci.get('datumPocetka'),
            datumZavrsetka: podaci.get('datumZavrsetka'),
            cijenaNajma: parseFloat(podaci.get('cijenaNajma'))
        })
    }

    // **********************************************************************************************************
    return (
        <>
            Dodavanje novog najma
            
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="datumPocetka">
                    <Form.Label>Datum početka</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="datumPocetka" 
                    required />
                </Form.Group>

                <Form.Group controlId="datumZavrsetka">
                    <Form.Label>Datum završetka</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="datumZavrsetka" 
                    required />
                </Form.Group>

                <Form.Group controlId="cijenaNajma">
                    <Form.Label>Cijena najma</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="cijenaNajma" 
                    required />
                </Form.Group>




              <Form.Group controlId="idstanovi">
                    <Form.Label>Stan</Form.Label>
                    <Form.Select
                value={stanSifra}
                onChange={(e)=>{setStanSifra(e.target.value)}}
                >
                {stanovi && stanovi.map((s,index)=>(
                  <option key={index} value={s.idstanovi}>{s.adresa}</option>
                ))}
                </Form.Select>
                </Form.Group>




                <Form.Group controlId="idzakupci">
                    <Form.Label>Zakupac</Form.Label>
                    <Form.Select
                value={zakupacSifra}
                onChange={(e)=>{setZakupacSifra(e.target.value)}}
                >
                {zakupci && zakupci.map((s,index)=>(
                  <option key={index} value={s.idzakupci}>{s.ime} {s.prezime}</option>
                ))}
                </Form.Select>
                </Form.Group>
                <hr />





                

                <Row className="akcije">
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.NAJMOVI_PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                      <Button variant="success" type="submit" className="siroko">
                         Dodaj Najam
                      </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
