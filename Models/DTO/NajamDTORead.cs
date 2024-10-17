namespace NekretnineZellAmSee.Models.DTO
{

    public record NajamDTORead(

       int? Idnajmovi,

       string? StanAdresaNaziv,

       string? ZakupacImePrezime,

       DateTime? DatumPocetka,

       DateTime? DatumZavrsetka,

       decimal? CijenaNajma



    );

}