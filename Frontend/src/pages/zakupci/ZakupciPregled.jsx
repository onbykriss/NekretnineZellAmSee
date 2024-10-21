import { Button, Table } from "react-bootstrap";
import ZakupciService from "../../services/ZakupciService";
import { useEffect, useState } from "react";
import { RouteNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

//**************************************************************************************************************************************************

export default function ZakupciPregled(){
    const [zakupci,setZakupci] = useState([]);
    const navigate = useNavigate();
    async function dohvatiZakupce(params) 
    {
        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        
        await ZakupciService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setZakupci(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }
    // npm run lint
    // javlja upozorenje
    // 28:7  warning  React Hook useEffect has a missing dependency: 'dohvatie'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    useEffect(() => {
        dohvatiZakupce();
        console.log('zakupci:', zakupci); // Add this line to log the contents of zakupci 
      }, []);
   
// ****************************************************************************************************************************************************

    async function obrisiAsync(sifra) {
        const odgovor = await ZakupciService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiZakupce();
    }
    function obrisi(sifra){
        obrisiAsync(sifra);
    }

// ****************************************************************************************************************************************************

    return(
        <>
            <Link to={RouteNames.ZAKUPCI_NOVI} className="btn btn-success siroko">
            Dodaj novog zakupca
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {zakupci && Array.isArray(zakupci) && zakupci.map((zakupac, index) => (
                        <tr key={index}>
                            <td>{zakupac.ime}</td>
                            <td>{zakupac.prezime}</td>
                            <td>{zakupac.email}</td>
                            <td>{zakupac.telefon}</td>
                            <td>
                                <Button variant="danger" onClick={() => obrisi(zakupac.idzakupci)}>
                                    Obriši
                                </Button>
                            &nbsp;&nbsp;&nbsp;
                                <Button variant="primary" onClick={() => navigate(`/zakupci/promjena/${zakupac.idzakupci}`)}>
                                    Promjena
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
