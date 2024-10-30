import StanoviService from "../../services/StanoviService";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RouteNames } from "../../constants";
import { useEffect, useState, useRef } from "react";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import nepoznato from '../../novo/nepoznato.png';

// *********************************************************************************************************
export default function StanoviPromjena() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();
    const [stan, setStan] = useState({});
    
    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);
  
   //*************************************************************************************************************
       async function dohvatiStan() {
        showLoading();
        const odgovor = await StanoviService.getBySifra(routeParams.sifra);
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setStan(odgovor.poruka);

        if(odgovor.poruka.slika!=null){
            setTrenutnaSlika(APP_URL + odgovor.poruka.slika + `?${Date.now()}`); // ovaj Date je da uvijek dovuče zadnju sliku
        }else{
            setTrenutnaSlika(nepoznato);
        }
    }
    //*********************************************************************************************************
    useEffect(() => {
        dohvatiStan();
    }, []);

// *********************************************************************************************************
    async function promjena(e) {
        showLoading();
        const odgovor = await StanoviService.promjena(routeParams.idstanovi, e); 
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.STANOVI_PREGLED);
    }

    // *********************************************************************************************************
    function obradiSubmit(e) {
      e.preventDefault();

      const podaci = new FormData(e.target);
        
      promjena ({
         kvadratura: parseFloat(podaci.get('kvadratura')),
         adresa: podaci.get('adresa'),
         oprema: podaci.get('oprema')
        });        
    }

    // *********************************************************************************************************
    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      }

    //*********************************************************************************************************
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
    //*********************************************************************************************************
      async function spremiSliku() {
        showLoading();
        const base64 = slikaZaServer;
        const odgovor = await StanoviService.postaviSliku(routeParams.sifra, {Base64: base64.replace('data:image/png;base64,', '')});
        hideLoading();
        if(odgovor.greska){
          alert(odgovor.podaci);
        }
        setTrenutnaSlika(slikaZaServer);
      }   

// *********************************************************************************************************

    return (
        <>
            Promjena stana
          <Row>
            <Col key='1' sm={12} lg={6} md={6}>
              <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="kvadratura">
                    <Form.Label>Kvadratura</Form.Label>
                    <Form.Control type="number" min={10} max={5000} name="kvadratura" required defaultValue={stan.kvadratura}/>
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type="text" name="adresa" required defaultValue={stan.adresa}/>
                </Form.Group>

                <Form.Group controlId="oprema">
                    <Form.Label>Oprema</Form.Label>
                    <Form.Control type="text" name="oprema" required defaultValue={stan.oprema}/>
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
                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RouteNames.POLAZNIK_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni stan
                    </Button>
                    </Col>
                </Row>
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