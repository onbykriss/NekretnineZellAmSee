import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/Najam')  
    .then((odgovor)=>{
        console.log('Grub odgovor servera:', odgovor);
        const updatedOdgovor = odgovor.data.map(item => ({
            ...item,
            cijena: item.cijena || null 
        }));
        return {greska: false, poruka: updatedOdgovor};
    })
    .catch((e)=>{
        console.error('Greška kod dodavanja najma:', e);
        return {greska: true, poruka: 'Problem kod dohvaćanja najmova'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Najam/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja najma'}   
    })
}


async function dodaj(najam) {
    console.log('Dodavanje novog najma:', najam); // Log the payload
    
    try {
        const response = await HttpService.post('/Najam', najam);
        console.log('Odgovor servera:', response); // Log the full response
        
        if (response.status === 201) {
            return { greska: false, poruka: 'Najam uspješno dodan' };
        } else {
            throw new Error(`Neočekivani statusni kod: ${response.status}`);
        }
    } catch (error) {
        console.error('Greška kod dodavanja najma:', error);
        return { greska: true, poruka: 'Problem kod dohvaćanja najmova.' };
    }
}

async function promjena(sifra,najam){
    return await HttpService.put('/Najam/' + sifra,najam)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja najma'}   
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Najam/'+sifra)
    .then((odgovor)=>{
        // Ensure cijena is included in the response
        const updatedOdgovor = {
            greska: false,
            poruka: odgovor.data
        };
        return updatedOdgovor;
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja najma s šifrom '+sifra}   
    })
}

export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}
