namespace NekretnineZellAmSee.Models.DTO
{

    public record NajamDTORead(

             int? Idnajam,
             DateTime? DatumPocetka,
             DateTime? DatumZavrsetka,
             decimal? Cijena,
             string? StanAdresaNaziv,
             string? ZakupacImePrezime
    );

}