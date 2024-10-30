import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import StanoviService from "../services/StanoviService"
import ZakupciService from "../services/ZakupciService"
import useLoading from "../hooks/useLoading"
import CountUp from "react-countup"

// *********************************************************************************************************
export default function Pocetna(){
    const { showLoading, hideLoading } = useLoading();
    const [stanovi, setStanovi] = useState([]);
    const [zakupci, setZakupci] = useState(0);
    

    // *********************************************************************************************************
    async function dohvatiStanove() {
        
        await StanoviService.dostupniStanovi()
        .then((odgovor)=>{
            setStanovi(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    // *********************************************************************************************************
    async function dohvatiBrojZakupca() {
        await ZakupciService.ukupnoZakupca()
        .then((odgovor)=>{
            setZakupci(odgovor.poruka);
        })
        .catch((e)=>{console.log(e)});
    }

    // *********************************************************************************************************
    async function ucitajPodatke() {
        
        await dohvatiStanove();
        await dohvatiBrojZakupca();
       ;
      }

    // *********************************************************************************************************
    useEffect(()=>{
        ucitajPodatke()
    },[]);



    return(
        <>
        <Row>
            <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
               Naši stanovi:
                <ul>
                    {stanovi && stanovi.map((stan,index)=>(
                        <li key={index}>{stan.adresa}</li>
                    ))}
                </ul>
                 </Col>
                   <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                   Do sada nam je povjerenje pokazalo
                     <div className="brojZakupci">
                      <CountUp
                         start={0}
                         end={zakupci}
                         duration={10}
                       separator=".">
                      </CountUp>
                     </div>
                    zakupca
                 </Col>
        </Row>
        </>
    )
}