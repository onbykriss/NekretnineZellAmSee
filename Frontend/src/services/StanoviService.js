import { HttpService } from "./HttpService";

//****GET********************************************************************************************************
async function get() {
    return await HttpService.get('/Stan')  //('/Stanovi') je ruta
    .then((odgovor)=>{
        
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        
        return {greska: true, poruka: 'Problem kod dohvaćanja stanova'}   
    })
}

//****BRISANJE********************************************************************************************************
async function brisanje(sifra){

    return await HttpService.delete('/Stan/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja stana'}   
    })
}

//****DODAJ********************************************************************************************************
async function dodaj(stan){
    return await HttpService.post('/Stan', stan)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja stana'}   
    })
}

//****PROMJENA********************************************************************************************************
async function promjena(sifra, stan){
    return await HttpService.put('/Stan/' + sifra, stan)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja stana'}   
    })
}

//**GETBYSIFRA**********************************************************************************************************
async function getBySifra(sifra){
    return await HttpService.get('/Stan/'+ sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja stana s šifrom '+ sifra}   
    })
}

async function getStranicenje(stranica,uvjet){
    return await HttpService.get('/Stan/traziStranicenje/'+stranica + '?uvjet=' + uvjet)
    .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
    .catch((e)=>{ return {greska: true, poruka: 'Problem kod traženja stanova '}});
}

async function traziIdstanovi(idstanovi){
        return await HttpService.get('/Stan/traziIdstanovi/'+idstanovi)
        .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
        .catch((e)=>{ return {greska: true, poruka: 'Problem kod traženja stanova '}});
}

async function postaviSliku(idstanovi, slika) {
        return await HttpService.put('/Stan/postaviSliku/' + idstanovi, slika)
        .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
        .catch((e)=>{ return {greska: true, poruka: 'Problem kod postavljanja slike stana '}});
}



export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,
    getStranicenje,
    traziIdstanovi,
    postaviSliku
}