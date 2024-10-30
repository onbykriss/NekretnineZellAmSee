using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NekretnineZellAmSee.Models
{
    public class Zakupac
    {
        [Key]
        public int idzakupci { get; set; }
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public string? Email { get; set; }
        public string? Telefon { get; set; }

        
    }
}
