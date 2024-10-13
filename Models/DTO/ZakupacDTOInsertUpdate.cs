using System.ComponentModel.DataAnnotations;

namespace NekretnineZellAmSee.Models.DTO
{
    public record ZakupacDTOInsertUpdate(

     [Required(ErrorMessage = "Ime obavezno")]
     string? Ime,

     [Required(ErrorMessage = "Prezime obavezno")]
     string? Prezime,

     [Required(ErrorMessage = "Email obavezno")]
     [EmailAddress(ErrorMessage = "Neispravan format email adrese")]
     string? Email,

     [Required(ErrorMessage = "Telefon obavezno")]
     string? Telefon

    );
}

