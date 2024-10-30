import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import StanoviService from "../../services/StanoviService";
import { useEffect, useState } from "react";
import { APP_URL, RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import nepoznato from "../../novo/nepoznato.png";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";

//**********************************************************************************
export default function StanoviPregled() {
    const [stanovi, setStanovi] = useState([]);
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState('');
    const { showLoading, hideLoading } = useLoading();
   
    //***************************************************************************************
    async function dohvatiStanove() {
       
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
    async function obrisiAsync(idstanovi) {
        showLoading();
        const odgovor = await StanoviService.brisanje(idstanovi);
        hideLoading();
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiStanove();
    }
    
    function obrisi(idstanovi){
        obrisiAsync(idstanovi);
    }
    
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

    //***************************************************************************************
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
                    maxLength={225}
                    defaultValue=''
                    onKeyUp={promjeniUvjet}
                    />
                </Col>
                <Col key={2} sm={12} lg={4} md={4}>
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
                </Col>
                <Col key={3} sm={12} lg={4} md={4}>
                    <Link to={RouteNames.STANOVI_NOVI} className="btn btn-success gumb">
                        <IoIosAdd 
                        size={25}
                        /> Dodaj
                    </Link>
                </Col>
            </Row>
            
                
            <Row>
             { stanovi && stanovi.map((p) => (

             <Col key={p.idstanovi} sm={12} lg={3} md={3}>
              <Card style={{ marginTop: '1rem' }}>
              <Card.Img variant="top" src={slika(p)} className="slika"/>
                <Card.Body>
                  <Card.Title>{p.adresa}</Card.Title>
                  <Card.Text>{p.email}</Card.Text>
                    <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/stanovi/${p.idstanovi}`}><FaEdit /></Link>
                      </Col>
                       <Col>
                      <Button variant="danger" className="gumb"  onClick={() => obrisi(p.idstanovi)}><FaTrash /></Button>
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