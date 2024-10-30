using System.ComponentModel.DataAnnotations;

namespace NekretnineZellAmSee.Models
{
    public class Stan
    {
        [Key]
        public int idstanovi { get; set; }
        public int? Kvadratura { get; set; }
        public string? Adresa { get; set; }
        public string? Oprema { get; set; }
        public string? Slika { get; set; }

        


    }
}