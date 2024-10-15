using System.ComponentModel.DataAnnotations;

namespace NekretnineZellAmSee.Models.DTO
{
    public record NajamDTOInsertUpdate(

                 [Required(ErrorMessage ="Obavezna šifra Najma")]
                 int? Idnajam,

                 [Required(ErrorMessage ="Obavezna šifra Stana")]
                 int? Idstanovi,

                 [Required(ErrorMessage ="Obavezna šifra Zakupca")]
                 int? Idzakupci,

                 [Required(ErrorMessage ="Obavezan datum početka")]
                 DateTime? DatumPocetka,

                 [Required(ErrorMessage ="Obavezan datum završetka")]
                 DateTime? DatumZavrsetka,

                 [Required(ErrorMessage ="Obavezna cijena najma")]
                 double? CijenaNajma

        );
  
}
