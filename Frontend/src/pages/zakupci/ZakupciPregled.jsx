import { Button, Table } from "react-bootstrap";
import ZakupciService from "../../services/ZakupciService";
import { useEffect, useState } from "react";
import { RouteNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

//**************************************************************************************************************************************************

export default function ZakupciPregled(){
    const [zakupci,setZakupci] = useState([]);
    const navigate = useNavigate();

    async function dohvatiZakupci() 
    {
        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        const odgovor = await ZakupciService.get();
        await ZakupciService.get()
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setZakupci(odgovor.poruka);
    }
    // npm run lint
    // javlja upozorenje
    // 28:7  warning  React Hook useEffect has a missing dependency: 'dohvatie'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    useEffect(() => {
        dohvatiZakupci();
        
      }, []);
   
// ****************************************************************************************************************************************************

    async function obrisi(idzakupci) {
        console.log('Brisanje zakupaca s šifrom:', idzakupci); // Dodano za dijagnostiku
        //console.log(odgovor);
        if(!confirm('Sigurno obrisati')){
            return;
        }
        dohvatiZakupci(idzakupci);
    }

    async function brisanjeStanovi(idzakupci){
        console.log('Poziv API-ja za brisanje s šifrom:', idzakupci); // Dodano za dijagnostiku
        const odgovor = await ZakupciService.brisanje(idzakupci);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiZakupci();
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
