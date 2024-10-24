import { useEffect, useState } from "react";
import StanoviService from "../../services/StanoviService";
import { APP_URL, RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import nepoznato from "../../novo/nepoznato.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";
import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";


export default function StanoviPregled() {
    const [stanovi, setStanovi] = useState([]);
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState('');
    const { showLoading, hideLoading } = useLoading();
   
    //***************************************************************************************
    async function dohvatiStanove() {
        console.log('Dohvaćanje stanova...');
        showLoading();
        const odgovor = await StanoviService.getStranicenje(stranica,uvjet);
        hideLoading();
          if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
          }
          if(odgovor.poruka.length==0){
            setStranica(stranica-1);
            return;
        }
        setStanovi(odgovor.poruka);
    }
    
    //***************************************************************************************
    useEffect(() => {
        dohvatiStanove();
    }, [stranica, uvjet]);

    //***************************************************************************************
    async function obrisiAsync(Idstanovi) {
        showLoading();
        hideLoading();
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiStanove();
    }
    
    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    //***************************************************************************************

    
    //***************************************************************************************
    function slika(stan) {
        if (stan.slika != null) {
            return APP_URL + stan.slika + `?${Date.now()}`;
        }
        return nepoznato;
    }
    
    //***************************************************************************************
    function promjeniUvjet(e) {
        if(e.nativeEvent.key == "Enter"){
            console.log('Enter')
            setStranica(1);
            setUvjet(e.nativeEvent.srcElement.value);
            setStanovi([]);
        }
    }

    function povecajStranicu() {
        setStranica(stranica + 1);
      }
    
      function smanjiStranicu() {
        if(stranica==1){
            return;
        }
        setStranica(stranica - 1);
      }

    //***************************************************************************************
    return(
        <>
           <Row>
                <Col key={1} sm={12} lg={4} md={4}>
                    <Form.Control
                    type='text'
                    name='trazilica'
                    placeholder='Dio adrese [Enter]'
                    maxLength={100}
                    defaultValue=''
                    onKeyUp={promjeniUvjet}
                    />
                </Col>
                <Col key={2} sm={12} lg={4} md={4}>
                    {stanovi && stanovi.length > 0 && (
                            <div style={{ display: "flex", justifyContent: "center" }}>  
                                <Pagination size="md">
                                <Pagination.Prev onClick={smanjiStranicu} />
                                <Pagination.Item disabled>{stranica}</Pagination.Item> 
                                <Pagination.Next
                                    onClick={povecajStranicu}
                                />
                            </Pagination>
                        </div>
                    )}
                </Col>
                <Col key={3} sm={12} lg={4} md={4}>
                    <Link to={RouteNames.STANOVI_NOVI} className="btn btn-success gumb">
                        Dodaj novi stan
                    </Link>
                </Col>
            </Row>
            
                
            <Row>
                
            { stanovi && stanovi.map((p) => (
           <Col key={p.sifra} sm={12} lg={3} md={3}>
              <Card style={{ marginTop: '1rem' }}>
              <Card.Img variant="top" src={slika(p)} className="slika"/>
                <Card.Body>
                  <Card.Title>{p.adresa}</Card.Title>
                  <Card.Text>
                    {p.email}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/stanovi/${p.Idstanovi}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => obrisi(p.stanovi)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>
      <hr />
              {stanovi && stanovi.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="lg">
                    <Pagination.Prev onClick={smanjiStranicu} />
                    <Pagination.Item disabled>{stranica}</Pagination.Item> 
                    <Pagination.Next
                        onClick={povecajStranicu}
                    />
                    </Pagination>
                </div>
                )}
        </>
    )

}