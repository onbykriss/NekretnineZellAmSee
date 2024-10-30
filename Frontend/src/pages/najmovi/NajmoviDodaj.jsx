import NajmoviService from "../../services/NajmoviService";
import Service from "../../services/NajmoviService";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';
import StanoviService from "../../services/StanoviService";

// **********************************************************************************************************
export default function NajmoviDodaj() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const [stanovi, setStanovi] = useState([]);
    const [idstanovi, setidstanovi] = useState(0);
    const { prikaziError } = useError();

    // **********************************************************************************************************
    async function dohvatiStanove(){
        showLoading();
        const odgovor = await StanoviService.get();
        hideLoading();
        setStanovi(odgovor.poruka);
        setidstanovi(odgovor.poruka[0].sifra
        );
      }
    
      useEffect(()=>{
        dohvatiStanove();
    }, []);


    // **********************************************************************************************************
    async function dodaj(e) {
        showLoading();
        const odgovor = await Service.dodaj(e)
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
        const podaci = new FormData(e.target)
       
        dodaj({
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
            Dodavanje novog najma
            
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="idstanovi">
                    <Form.Label>Stanovi</Form.Label>
                    <Form.Control
                        type="number"
                        name="idstanovi"
                        required
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='stanovi'>
                   <Form.Label>Stan</Form.Label>
                <Form.Select 
                      onChange={(e)=>{setidstanovi(e.target.value)}}
                      >
                         {stanovi && stanovi.map((s,index)=>(
                       <option key={index} value={s.idstanovi}> 
                      {s.naziv}</option>))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="idzakupci">
                    <Form.Label>Zakupci_</Form.Label>
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
