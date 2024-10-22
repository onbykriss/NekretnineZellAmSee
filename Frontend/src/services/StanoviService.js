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

export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}