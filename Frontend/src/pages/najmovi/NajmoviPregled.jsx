import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Service from "../../services/NajmoviService"; // Updated import
import { RouteNames } from "../../constants";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';

export default function NajmoviPregled(){
    const [najmovi, setNajmovi] = useState();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    async function dohvatiNajmove(){
        showLoading();
        await Service.get()
            .then((odgovor) => {
                setNajmovi(odgovor);
            })
            .catch((e) => {
                console.log(e);
            });
        hideLoading();
    }

    async function obrisiNajam(sifra) {
        showLoading();
        const odgovor = await Service.obrisi(sifra);
        hideLoading();
        
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        dohvatiNajmove();
    }

    useEffect(() => {
        dohvatiNajmove();
    }, []);

    return (
        <Container>
            <Link to={RouteNames.NAJMOVI_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                    size={25}
                /> Dodaj
            </Link>
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
                    {najmovi && Array.isArray(najmovi) && najmovi.map((najam, index) => (
                        <tr key={index}>
                            <td>{new Date(najam.datumPocetka).toLocaleDateString()}</td>
                            <td>{new Date(najam.datumZavrsetka).toLocaleDateString()}</td>
                            <td>{najam.stanAdresaNaziv}</td>
                            <td>{najam.zakupacImePrezime}</td>
                            <td>{najam.cijenaNajma}</td>
                            <td className="sredina">
                                <Button
                                    variant='primary'
                                    onClick={() => navigate(`/najmovi/promjena/${najam.idnajmovi}`)}
                                >
                                    <FaEdit 
                                        size={25}
                                    />
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant='danger'
                                    onClick={() => obrisiNajam(najam.idnajmovi)}
                                >
                                    <FaTrash
                                        size={25}
                                    />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
