import { useEffect, useState } from "react";
import StanoviService from "../../services/StanoviService";
import { APP_URL, RouteNames } from "../../constants";
import { Link } from "react-router-dom";
import nepoznato from "../../novo/nepoznato.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";

export default function StanoviPregled() {
    const [stanovi, setStanovi] = useState([]);
    const [stranica, setStranica] = useState(1);
    const [pretragaAdresa, setPretragaAdresa] = useState('');
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiStanove() {
        console.log('Dohvaćanje stanova...');
        showLoading();
      
        try {
          const odgovor = await StanoviService.getStranicenje(stranica, `${pretragaAdresa ? `&adresa=${pretragaAdresa}` : ''}`);
          
          console.log('Response from server:', odgovor);
          
          if (odgovor.greska) {
            console.error('Greška pri dohvaćanju stanova:', odgovor.poruka);
            alert('Došlo je do greške pri učitavanju podataka.');
            hideLoading();
            return;
          }
      
          if (Array.isArray(odgovor.poruka)) {
            console.log('Ažuriram stanje stanovi:', odgovor.poruka);
            setStanovi(odgovor.poruka);
          } else {
            console.error('Podaci o stanovima nisu u očekivanom formatu.');
            alert('Došlo je do greške pri učitavanju podataka.');
          }
        } catch (error) {
          console.error('Greška pri dohvaćanju stanova:', error);
          alert('Došlo je do greške pri učitavanju podataka.');
        } finally {
          hideLoading();
      }
    }
    

  
    useEffect(() => {
        dohvatiStanove();
    }, [stranica, pretragaAdresa]);

    function obrisi(idstanovi) {
        showLoading();
        console.log('Brisanje stanova s šifrom:', idstanovi); // Dodano za dijagnostiku
        hideLoading();
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
        await dohvatiStanove(); // Čekamo da se dohvatiStanove završi
    }

    function slika(stan) {
        if (stan.slika != null) {
            return APP_URL + stan.slika + `?${Date.now()}`;
        }
        return nepoznato;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setStranica(1);
        dohvatiStanove();
    };

    // Nakon dohvatanja stanova, dodajte ovu proveru:
if (stanovi.length === 0) {
    console.log("Nema rezultata pretrage.");
    // Možete postaviti poruku korisniku da kaže da nema rezultata
  } else {
    console.log(`Prikaženi su ${stanovi.length} rezultata.`);
  }

  return (
    <div>
      <h5>Pregled stanova</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Unesite adresu ili dio adrese"
          value={pretragaAdresa}
          onChange={(e) => setPretragaAdresa(e.target.value)}
        />
        <button type="submit">Traži</button>
      </form>

      {stanovi.length > 0 ? (
        <ul>
          {stanovi.map(stan => (
              <li key={stan.idstanovi}>
                <h5>{stan.adresa}</h5>
                <p>kvadratura: {stan.kvadratura}</p>
                <p>oprema: {stan.oprema}</p>
              <img src={slika(stan)} alt={`Slika ${stan.adresa}`} style={{ width: '200px' }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Nema rezultata pretrage.</p>
      )}
        </div>
    );
}
