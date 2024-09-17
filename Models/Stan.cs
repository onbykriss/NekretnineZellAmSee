
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NekretnineZellAmSee.Models
{
    public class Stan
    {
        [Key]
        public int? Idstanovi { get; set; }
        public int? Kvadratura { get; set; }
        public string? Adresa { get; set; }
        public string? Oprema { get; set; }
        public string? Slika { get; set; }
    }
}