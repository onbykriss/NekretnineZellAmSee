import { HttpService } from "./HttpService";

//****GET********************************************************************************************************
async function get() {
    return await HttpService.get('/Stan')  //('/Stanovi') je ruta
    .then((odgovor)=>{
        return odgovor.data
    })
    .catch((e)=>{console.error(e)})
    
}

//****BRISANJE********************************************************************************************************
async function brisanje(Idstanovi){

    return await HttpService.delete('/Stan/' + Idstanovi)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Stan se nemože obrisati'}   
    })
}

//****DODAJ********************************************************************************************************
async function dodaj(Stan){
    return await HttpService.post('/Stan', Stan)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch(e.status){
            case 400:
                 let poruke = '';
                 for(const kljuc in e.response.data.errors){
                        poruke += kljuc + ':' + e.response.data.errors[kljuc][0] + '\n';
                    }  
                    return {greska: true, poruka: poruke}  
            default:
                return {greska: true, poruka: 'stan se nemože dodati'}
        }
    })
}

//****PROMJENA********************************************************************************************************
async function promjena(Idstanovi, Stan){
    return await HttpService.put('/Stan/' + Idstanovi, Stan)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch(e.status){
            case 400:
                 let poruke = '';
                 for(const kljuc in e.response.data.errors){
                        poruke += kljuc + ':' + e.response.data.errors[kljuc][0] + '\n';
                    }  
                    return {greska: true, poruka: poruke}  
            default:
                return {greska: true, poruka: 'stan se nemože promjeniti'}
        }
    })
}

//**GETBYSIFRA**********************************************************************************************************
async function getBySifra(Idstanovi){
    return await HttpService.get('/Stan/'+ Idstanovi)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'stan ne postoji'}   
    })
}

//**TRAZIIDSTANOVI**********************************************************************************************************
async function traziStan(uvjet){
    return await HttpService.get('/Stan/trazi/'+ uvjet)
    .then((odgovor)=>{
        return  {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{ return {greska: true, poruka: 'Problem kod traženja stanova'}});
}

//**GETSTRANICENJE**********************************************************************************************************
async function getStranicenje(stranica,uvjet){
    return await HttpService.get('/Stan/traziStranicenje/'+stranica + '?uvjet=' + uvjet)
    .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
    .catch((e)=>{ return {greska: true, poruka: 'Problem kod traženja stanova '}});
}

//**POSTAVISLIKU**********************************************************************************************************
async function postaviSliku(idstanovi, slika) {
        return await HttpService.put('/Stan/postaviSliku/' + idstanovi, slika)
        .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
        .catch((e)=>{ return {greska: true, poruka: 'Problem kod postavljanja slike stana '}});
}

//**EXPORT**********************************************************************************************************
async function ukupnoStanova(){
    return await HttpService.get('/Pocetna/UkupnoStanova')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

//************************************************************************************************************
async function dostupniStanovi(){
    return await HttpService.get('/Pocetna/Dostupnistanovi')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,
    
    getStranicenje,
    traziStan,
    postaviSliku,

    ukupnoStanova,
    dostupniStanovi
}