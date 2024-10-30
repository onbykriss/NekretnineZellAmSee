import ZakupciService from "../../services/ZakupciService";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RouteNames } from "../../constants";
import { useEffect, useState, useRef } from "react";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import nepoznataOsoba from '../../novo/nepoznataOsoba.png'; 

//*********************************************************************************************************
export default function ZakupciPromjena(){
    const navigate = useNavigate();
    const [zakupac,setZakupac] = useState({});
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
    
    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);

    //*********************************************************************************************************
    async function dohvatiZakupca(){
        showLoading();
        const odgovor = await ZakupciService.getBySifra(routeParams.idzakupci);
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        setZakupac(odgovor.poruka);

        if(odgovor.poruka.slika!=null){
            setTrenutnaSlika(APP_URL + odgovor.poruka.slika + `?${Date.now()}`); // ovaj Date je da uvijek dovuče zadnju sliku
          }else{
            setTrenutnaSlika(nepoznataOsoba);
          }
    }

    //*********************************************************************************************************
    useEffect(()=>{
        dohvatiZakupca();
    }, []);

//*********************************************************************************************************
    async function promjena(e){
        showLoading();
        const odgovor = await ZakupciService.promjena(routeParams.idzakupci, e);  
        hideLoading();
        if (odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.ZAKUPCI_PREGLED);
    }

    //*********************************************************************************************************
    function obradiSubmit(e){ 
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            telefon: podaci.get('telefon')
        });
    }
    
    //**********************************************************************************************************
    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
    
    //**********************************************************************************************************
    function onChangeImage(e) {
        e.preventDefault();
    
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setSlikaZaCrop(reader.result);
        };
        try {
          reader.readAsDataURL(files[0]);
        } catch (error) {
          console.error(error);
        }
      }
    //**********************************************************************************************************
    async function spremiSliku() {
        showLoading();
        const base64 = slikaZaServer;
        const odgovor = await ZakupciService.postaviSliku(routeParams.idzakupci, {Base64: base64.replace('data:image/png;base64,', '')});
        hideLoading();
        if(odgovor.greska){
          alert(odgovor.podaci);
        }
        setTrenutnaSlika(slikaZaServer);
      }   

    //*********************************************************************************************************
    
return(
    <>
     Promjena Zakupca
        <Row>
            <Col key='1' sm={12} lg={6} md={6}>
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

                <Row className='mb-4'>
              <Col key='1' sm={12} lg={6} md={12}>
                <p className='form-label'>Trenutna slika</p>
                <Image
                  //za lokalni development
                  //src={'https://edunovawp1.eu/' + trenutnaSlika}
                  src={trenutnaSlika}
                  className='slika'
                />
              </Col>
              <Col key='2' sm={12} lg={6} md={12}>
                {slikaZaServer && (
                  <>
                    <p className='form-label'>Nova slika</p>
                    <Image
                      src={slikaZaServer || slikaZaCrop}
                      className='slika'
                    />
                  </>
                )}
              </Col>
            </Row>
                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.ZAKUPCI_PREGLED}
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
                <hr />
                
            </Form> 
            </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        <input className='mb-3' type='file' onChange={onChangeImage} />
              <Button disabled={!slikaZaServer} onClick={spremiSliku}>
                Spremi sliku
              </Button>

              <Cropper
                src={slikaZaCrop}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                cropstart={onCrop}
                cropend={onCrop}
                ref={cropperRef}
              />
        </Col>
      </Row>

            
    </>
    )
}