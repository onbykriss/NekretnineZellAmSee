import { HttpService } from "./HttpService";

//****GET********************************************************************************************************
async function get(){
    return await HttpService.get('/Najam')  
    .then((odgovor)=>{
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

//***BRISANJE*********************************************************************************************************
async function obrisi(Idnajmovi){
    return await HttpService.delete('/Najam/' + Idnajmovi)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Najam se nemože obrisati'}   
    })
}

//****DODAJ********************************************************************************************************
async function dodaj(Najam) {
    return await HttpService.post('/Najam', Najam)
    .then(()=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch(e.status){
            case 400:
                let poruke = '';
             for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ':' + e.response.data.errors[kljuc] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Najam se nemože dodati'}
        }
    })    
}

//****PROMJENA********************************************************************************************************
async function promjena(Idnajmovi,najam){
    return await HttpService.put('/Najam/' + Idnajmovi,najam)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch(e.status){
            case 400:
                let poruke = '';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ':' + e.response.data.errors[kljuc] + '\n';
                }
                console.log(poruke);
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Najam se nemože promjeniti'} 
        }
    })
}

//**GETBYSIFRA**********************************************************************************************************
async function getBySifra(Idnajmovi){
    return await HttpService.get('/Najam/'+ Idnajmovi)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Najam ne postoji '+ Idnajmovi}   
    })
}

//***********************************************************************************************************	
async function getZakupci(Idnajmovi){
    return await HttpService.get('/Najam/Zakupci'+ Idnajmovi)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod dohvaćanja zakupca'}})
}

//***********************************************************************************************************
async function dodajZakupca(Najam,Zakupac) {
    return await HttpService.post('/Najam/' + Najam + '/dodaj/'+Zakupac)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
                return {greska: true, poruka: 'Zakupac se nemože dodati na Najam'}
    })
}

//***********************************************************************************************************
async function obrisiZakupca(Najam,Zakupac) {
    return await HttpService.delete('/Najam/' + Najam + '/obrisi/'+Zakupac)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
                return {greska: true, poruka: 'Zakupac se nemože obrisati iz Najmova'}
    })
}

//***********************************************************************************************************
async function grafNajam(){
    return await HttpService.get('/Najam/GrafNajam')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

//***********************************************************************************************************
export default {
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena,

    getZakupci,
    dodajZakupca,
    obrisiZakupca,

    grafNajam
}
