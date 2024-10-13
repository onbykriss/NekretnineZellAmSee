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
        setStanovi(Array.isArray(odgovor.poruka) ? odgovor.poruka : []);
    }

    useEffect(() => {
        dohvatiStanovi();
        console.log('stanovi:', stanovi);
    }, []);

    function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return;
        }
        brisanjeStanovi(sifra);
    }

    async function brisanjeStanovi(sifra) {
        console.log('Deleting property with ID:', sifra); // Debugging log
        const odgovor = await StanoviService.brisanje(sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        alert('Property deleted successfully');
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
                {Array.isArray(stanovi) && stanovi.map((stan, index) => { 
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