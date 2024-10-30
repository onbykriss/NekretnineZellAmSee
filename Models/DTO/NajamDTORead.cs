namespace NekretnineZellAmSee.Models.DTO
{
    public record NajamDTORead(

       int? idnajmovi,

       string? StanAdresaNaziv,

       string? ZakupacImePrezime,

       DateTime? DatumPocetka,

       DateTime? DatumZavrsetka,

       decimal? CijenaNajma



    );

}