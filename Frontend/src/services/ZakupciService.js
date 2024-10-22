import { HttpService } from "./HttpService";

//****GET**********************************************************************************************************
async function get() {
    return await HttpService.get('/Zakupac')
        .then((odgovor) => {

            return {greska: false, poruka: odgovor.data}
        })
        .catch((e) => {

            return {greska: true, poruka: 'Problem kod dohvaćanja stanova'} 
        })
}

//****BRISANJE**********************************************************************************************************
async function brisanje(sifra) {
    return await HttpService.delete('/Zakupac/' + sifra)
        .then(() => {
            return { greska: false, poruka: 'Obrisano' }
        })
        .catch(() => {
            return { greska: true, poruka: 'Problem kod brisanja stana' }
        })
}

//*****DODAJ*********************************************************************************************************
async function dodaj(zakupac) {
    return await HttpService.post('/Zakupac', zakupac)
        .then(() => {
            return { greska: false, poruka: 'Dodano'};
        })
        .catch(() => {
            return { greska: true, poruka: 'Problem kod dodavanja zakupca'}
        })
}

//******PROMJENA********************************************************************************************************
async function promjena(sifra, zakupac) {
    return await HttpService.put('/Zakupac/' + sifra, zakupac)
        .then(() => {
            return { greska: false, poruka: 'Promijenjeno'};
        })
        .catch(() => {
           return { greska: true, poruka: 'Problem kod promjene zakupca' };  
        });
}

//****GETBYSIFRA**********************************************************************************************************
async function getBySifra(sifra) {
    return await HttpService.get('/Zakupac/' + sifra)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data }
        })
        .catch((e) => {
            return { greska: true, poruka: 'Problem kod dohvačanja zakupca s šifrom' + sifra }
        })
}


export default {
    get,
    getBySifra,
    brisanje,
    dodaj,
    promjena
}