import { useEffect, useState } from "react";
import StanoviService from "../../services/StanoviService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function StanoviPregled() {
    const navigate = useNavigate();
    const [stanovi, setStanovi] = useState([]);
    
    async function dohvatiStanovi() 
    {
        const odgovor = await StanoviService.get();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setStanovi(odgovor.poruka);
    }

    useEffect(() => {
        dohvatiStanovi();
    }, []);

    function obrisi(idstanovi) {
        console.log('Brisanje stanova s šifrom:', idstanovi); // Dodano za dijagnostiku
        if (!confirm('Sigurno obrisati')) {
            return;
        }
        brisanjeStanovi(idstanovi);
    }

    async function brisanjeStanovi(idstanovi) {
        console.log('Poziv API-ja za brisanje s šifrom:', idstanovi); // Dodano za dijagnostiku
        const odgovor = await StanoviService.brisanje(idstanovi);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiStanovi();
    }

    return (
        <>
            <Link to={RouteNames.STANOVI_NOVI} className="btn btn-success siroko">
                Dodaj novi stan
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Kvadratura</th>
                        <th>Adresa</th>
                        <th>Oprema</th>
                        <th>Slika</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                {stanovi && stanovi.map((stan, index) => { 
                      console.log('Stan:', stan);;
                    return (
                        <tr key={index}>
                            <td>{stan.kvadratura}</td>
                            <td>{stan.adresa}</td>
                            <td>{stan.oprema}</td>
                            <td><img src={stan.slika} alt="Slika stana" style={{ width: '100px' }} /></td>
                            <td>
                                <Button variant="danger" onClick={() => obrisi(stan.idstanovi)}>Obriši</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant="primary" onClick={() => navigate(`/stanovi/promjena/${stan.idstanovi}`)}>Promjena</Button>
                            </td>
                        </tr>
                    );
                   })}    
                </tbody>
            </Table>
        </>
    );
}