import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import ZakupciService from "../../services/ZakupciService";
import { useEffect, useState } from "react";
import { APP_URL, RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import nepoznataosoba from '../../novo/nepoznataosoba.png'; 
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";

//**************************************************************************************************************************************************
export default function ZakupciPregled(){
    const [zakupci,setZakupci] = useState();
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState('');
    const { showLoading, hideLoading } = useLoading();

    // **************************************************************************************************************************************************
    async function dohvatiZakupce() 
    {
        showLoading();
        showLoading
        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        const odgovor = await ZakupciService.getStranicenje(stranica, uvjet);
        await ZakupciService.get()
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        if(odgovor.poruka.length==0){
            setStranica(stranica-1);
            return;
        }
        setZakupci(odgovor.poruka);
    }
    // npm run lint
    // javlja upozorenje
    // 28:7  warning  React Hook useEffect has a missing dependency: 'dohvatie'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    useEffect(() => {
        dohvatiZakupce();
      }, [stranica, uvjet]);
   
// ****************************************************************************************************************************************************

    async function obrisiAsync(idzakupci) {
        showLoading();
        hideLoading();
        //console.log(odgovor);
        if(odgovor.greska){
           alert(odgovor.poruka);
           return;
        }
        dohvatiZakupce();
    }

// **************************************************************************************************************************************************
   function obrisi(idzakupci) {
        obrisiAsync(idzakupci);
    }

    // **************************************************************************************************************************************************
    function slika(zakupac) {
        if (zakupac.slika != null) {
            return APP_URL + zakupac.slika + `?${Date.now()}`;
        }
        return nepoznataosoba;
    }

// ****************************************************************************************************************************************************
function promjeniUvjet(e) {
    if(e.nativeEvent.key == "Enter"){
        console.log('Enter')
        setStranica(1);
        setUvjet(e.nativeEvent.srcElement.value);
        setZakupci([]);
    }
}

// ****************************************************************************************************************************************************
function povecajStranicu() {
    setStranica(stranica + 1);
  }

  function smanjiStranicu() {
    if(stranica==1){
        return;
    }
    setStranica(stranica - 1);
  }

// ****************************************************************************************************************************************************

return(
    <>
       <Row>
            <Col key={1} sm={12} lg={4} md={4}>
                <Form.Control
                type='text'
                name='trazilica'
                placeholder='Dio imena i prezimena [Enter]'
                maxLength={255}
                defaultValue=''
                onKeyUp={promjeniUvjet}
                />
            </Col>
            <Col key={2} sm={12} lg={4} md={4}>
                {zakupci && zakupci.length > 0 && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Pagination size="lg" key="pagination">
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
                <Link to={RouteNames.ZAKUPCI_NOVI} className="btn btn-success gumb">
                    <IoIosAdd
                    size={25}
                    /> Dodaj
                </Link>
            </Col>
        </Row>
        
            
        <Row>
            
        { zakupci && zakupci.map((p) => (
       <Col key={p.idzakupci} sm={12} lg={3} md={3}>
          <Card style={{ marginTop: '1rem' }}>
          <Card.Img variant="top" src={slika(p)} className="slika"/>
            <Card.Body>
            
              <Card.Title>{p.ime} {p.prezime}</Card.Title>
              <Card.Text>{p.email}</Card.Text>

              <Row>
                  <Col>
                  <Link className="btn btn-primary gumb" to={`/Zakupci/${p.idzakupci}`}><FaEdit /></Link>
                  </Col>
                  <Col>
                  <Button variant="danger" className="gumb"  onClick={() => obrisi(p.idzakupci)}><FaTrash /></Button>
                  </Col>
                </Row>
            </Card.Body>
          </Card>
        </Col>
      ))
  }
  </Row>
  <hr />
          {zakupci && zakupci.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination size="lg" key="pagination">
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
