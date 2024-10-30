import { HttpService } from "./HttpService";

//****GET**********************************************************************************************************
async function get() {
    return await HttpService.get('/Zakupac')
        .then((odgovor) => {

            return odgovor.data;
        })
        .catch((e) => {console.error(e)})    
}

//****BRISANJE**********************************************************************************************************
async function brisanje(idzakupci) {
    return await HttpService.delete('/Zakupac/' + idzakupci)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data }
        })
        .catch(() => {
            return { greska: true, poruka: 'Zakupac se nemože obrisati' }
        })
}

//*****DODAJ*********************************************************************************************************
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
                        poruke += kljuc + ':' + e.response.data.errors[kljuc][0]
                    }
                    return { greska: true, poruka: poruke }
                default:
                    return { greska: true, poruka: 'Zakupac se nemože dodati' }
            }
        })
}

//******PROMJENA********************************************************************************************************
async function promjena(idzakupci, Zakupac) {
    return await HttpService.put('/Zakupac/' + idzakupci, Zakupac)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
           switch (e.status) {
                case 400:
                    let poruke = '';
                    for (const kljuc in e.response.data.errors) {
                        poruke += kljuc + ':' + e.response.data.errors[kljuc][0]
                    }
                    return { greska: true, poruka: poruke }
                default:
                    return { greska: true, poruka: 'Zakupac se nemože promjeniti' }
            }  
        })
}

//****GETBYSIFRA**********************************************************************************************************
async function getBySifra(idzakupci) {
    return await HttpService.get('/Zakupac/' + idzakupci)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data }
        })
        .catch(() => {
            return { greska: true, poruka: 'Zakupac ne postoji'}
        })
}

//**************************************************************************************************************
async function traziZakupac(uvjet){
    return await HttpService.get('/Zakupac/trazi/'+uvjet)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod traženja zakupca'}})
}

//**************************************************************************************************************
async function getStranicenje(stranica,uvjet){
    return await HttpService.get('/Zakupac/traziStranicenje/'+stranica + '?uvjet=' + uvjet)
    .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
    .catch((e)=>{ return {greska: true, poruka: 'Problem kod traženja zakupca '}});
  }

//**************************************************************************************************************
  async function postaviSliku(idzakupci, slika) {
    return await HttpService.put('/Zakupac/postaviSliku/' + idzakupci, slika)
    .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
    .catch((e)=>{ return {greska: true, poruka: 'Problem kod postavljanja slike zakupca '}});
  }

//**************************************************************************************************************
  async function ukupnoZakupca(){
    return await HttpService.get('/Pocetna/UkupnoZakupca')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}
//**************************************************************************************************************

export default {
    get,
    getBySifra,
    brisanje,
    dodaj,
    promjena,

    traziZakupac,
    getStranicenje,
    postaviSliku,

    ukupnoZakupca
}