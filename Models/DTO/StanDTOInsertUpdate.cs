using System.ComponentModel.DataAnnotations;

namespace NekretnineZellAmSee.Models.DTO
{
    public record StanDTOInsertUpdate(

     [Range(2, 1000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
     [Required(ErrorMessage = "Kvadratura obavezno")]
     int? Kvadratura,

     [Required(ErrorMessage = "Adresa obavezno")]
     string? Adresa,

     [Required(ErrorMessage = "Oprema obavezno")]
     string? Oprema,


     string? Slika
     );




}
