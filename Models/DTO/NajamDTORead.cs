namespace NekretnineZellAmSee.Models.DTO
{
   
        public record NajamDTORead(

                 int? Idnajam,
                 string? StanAdresaNaziv,
                 string? ZakupacImePrezime,
                 DateTime? DatumPocetka, 
                 DateTime? DatumZavrsetka, 
                 double? CijenaNajma
            );
    
}
