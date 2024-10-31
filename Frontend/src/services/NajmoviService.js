import { HttpService } from "./HttpService";


//****GET********************************************************************************************************
export async function get() {
    try {
        const response = await HttpService.get('/Najam');
        return response.data;
    } catch (error) {
        console.error('Error fetching najmi data:', error);
        throw error;
    }
}


//***BRISANJE*********************************************************************************************************
async function obrisi(idnajmovi){
    return await HttpService.delete('/Najam/' + idnajmovi)
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
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Najam se nemože dodati'}
        }
    })    
}

//****PROMJENA********************************************************************************************************
async function promjena(idnajmovi,najam){
    return await HttpService.put('/Najam/' + idnajmovi,najam)
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
async function getBySifra(idnajmovi){
    return await HttpService.get('/Najam/'+ idnajmovi)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Najam ne postoji '+ idnajmovi}   
    })
}

//***********************************************************************************************************	
async function getZakupci(idnajmovi){
    return await HttpService.get('/Najam/Zakupci'+ idnajmovi)
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


//***********************************************************************************************************
export default {
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena,

    getZakupci,
    dodajZakupca,
    obrisiZakupca

   
}
