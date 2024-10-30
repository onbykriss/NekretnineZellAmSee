using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NekretnineZellAmSee.Models
{
    public class Najam
    {
        [Key]
        [Column("idnajmovi")]
        public int idnajmovi { get; set; }

        [ForeignKey("idstanovi")]
        public Stan Stan { get; set; }

        [ForeignKey("idzakupci")]
        public Zakupac Zakupac { get; set; }

        public DateTime? DatumPocetka { get; set; }
        public DateTime? DatumZavrsetka { get; set; }

        [Column("cijenanajma")]
        public decimal? CijenaNajma { get; set; }

        
    }
}