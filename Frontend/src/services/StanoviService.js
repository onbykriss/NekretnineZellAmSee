import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/Stanovi')  //('/Stanovi') je ruta
    .then((odgovor)=>{
        //console.log(odgovor.data)
        //console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja stanova'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Stanovi/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja stana'}   
    })
}


async function dodaj(stan){
    return await HttpService.post('/Stanovi',stan)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja stana'}   
    })
}

async function promjena(sifra,stan){
    return await HttpService.put('/Stanovi/' + sifra,stan)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja stana'}   
    })
}


async function getBySifra(sifra){
    return await HttpService.get('/Stanovi/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja stana s šifrom '+sifra}   
    })
}

export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}