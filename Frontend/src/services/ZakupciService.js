import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get('/Zakupac')
        .then((odgovor) => {
            return odgovor.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

async function getBySifra(sifra) {
    return await HttpService.get('/Zakupac/' + sifra)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch(() => {
            return { greska: true, poruka: 'Zakupac ne postoji!' };
        });
}

async function obrisi(sifra) {
    return await HttpService.delete('/Zakupac/' + sifra)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch(() => {
            return { greska: true, poruka: 'Zakupac se ne može obrisati!' };
        });
}

async function dodaj(Zakupac) {
    return await HttpService.post('/Zakupac', Zakupac)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            switch (e.status) {
                case 400:
                    let poruke = '';
                    for (const kljuc in e.response.data.errors) {
                        poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                    }
                    return { greska: true, poruka: poruke };
                default:
                    return { greska: true, poruka: 'Zakupac se ne može dodati!' };
            }
        });
}

async function promjena(sifra, Zakupac) {
    return await HttpService.put('/Zakupac/' + sifra, Zakupac)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            switch (e.status) {
                case 400:
                    let poruke = '';
                    for (const kljuc in e.response.data.errors) {
                        poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                    }
                    return { greska: true, poruka: poruke };
                default:
                    return { greska: true, poruka: 'Zakupac se ne može promjeniti!' };
            }
        });
}

export default {
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
};