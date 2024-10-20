using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NekretnineZellAmSee.Models
{
    public class Najam
    {
        [Key]
        [Column("idnajmovi")]
        public int? Idnajmovi { get; set; }

        [ForeignKey("Idstanovi")]
        public Stan Stan { get; set; }

        [ForeignKey("Idzakupci")]
        public Zakupac Zakupac { get; set; }

        public DateTime? DatumPocetka { get; set; }
        public DateTime? DatumZavrsetka { get; set; }

        [Column("cijenanajma")]
        public decimal? CijenaNajma { get; set; }
    }
}