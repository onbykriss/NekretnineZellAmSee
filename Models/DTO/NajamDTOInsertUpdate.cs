using System.ComponentModel.DataAnnotations;

namespace NekretnineZellAmSee.Models.DTO
{
    public record NajamDTOInsertUpdate(

        [Required(ErrorMessage ="Obavezan idstana")]
         int? idstanovi,

        [Required(ErrorMessage ="Obavezan idzakupca")]
         int? idzakupci,

         [Required(ErrorMessage ="Obavezan datum početka")]
         DateTime? DatumPocetka,

         [Required(ErrorMessage ="Obavezan datum završetka")]
         DateTime? DatumZavrsetka,

         [Required(ErrorMessage ="Obavezna cijena najma")]
         decimal? CijenaNajma

    );

}
