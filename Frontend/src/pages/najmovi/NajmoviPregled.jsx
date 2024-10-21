import { useEffect, useState } from "react";
import NajmoviService from "../../services/NajmoviService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

//**************************************************************************************************************************************************

export default function NajmoviPregled() {
    console.log('Component rendering'); // Debugging log
    
    const navigate = useNavigate();
    const [najmovi, setNajmovi] = useState([]);

    async function dohvatiNajmove() {
        console.log('Fetching rentals...'); // Debugging log
        const odgovor = await NajmoviService.get();
        console.log('Response from server:', odgovor); // Debugging log
        
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        
        const updatedNajmovi = Array.isArray(odgovor.poruka) ? odgovor.poruka : [];
        console.log('Updated najmovi:', updatedNajmovi); // Debugging log
        
        setNajmovi(updatedNajmovi);
    }

    useEffect(() => {
        dohvatiNajmove();
    }, []);

    //**************************************************************************************************************************************************

    function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return;
        }
        brisanjeNajmove(sifra);
    }

    async function brisanjeNajmove(sifra) {
        console.log('Brisanje najmova s šifrom:', sifra); // Debugging log
        const odgovor = await NajmoviService.brisanje(sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        alert('Uspješno obrisano');
        dohvatiNajmove();
    }

//**************************************************************************************************************************************************

    return (
        <>
            <Link to={RouteNames.NAJMOVI_NOVI} className="btn btn-success siroko">
                Dodaj novi najam
            </Link>
            {najmovi.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Datum početka</th>
                            <th>Datum završetka</th>
                            <th>Stan</th>
                            <th>Zakupac</th>
                            <th>Cijena</th>
                            <th>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(najmovi) && najmovi.map((najam, index) => { 
                          console.log('Najam:', najam);;
                        return (
                            <tr key={index}>
                                <td>{new Date(najam.datumPocetka).toLocaleDateString()}</td>
                                <td>{new Date(najam.datumZavrsetka).toLocaleDateString()}</td>
                                <td>{najam.stanAdresaNaziv}</td>
                                <td>{najam.zakupacImePrezime}</td>
                                <td>{najam.cijenaNajma}</td>
                                <td>
                                    <Button variant="danger" onClick={() => obrisi(najam.idnajmovi)}>
                                        Obriši
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="primary" onClick={() => navigate(`/najmovi/promjena/${najam.idnajmovi}`)}>
                                        Promjena
                                    </Button>
                                </td>
                            </tr>
                        );
                       })}
                    </tbody>
                </Table>
            ) : (
                <p>Nema slobodnih najmova.</p>
            )}
        </>
    );
}
