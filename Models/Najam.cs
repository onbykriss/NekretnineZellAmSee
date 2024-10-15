namespace NekretnineZellAmSee.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



    public class Najam
    {
        [Key]
        [Column("idnajmovi")]
        public int Idnajam { get; set; }
        public DateTime? DatumPocetka { get; set; }
        public DateTime? DatumZavrsetka { get; set; }

        [Column("cijenanajma")]
        public decimal? Cijena { get; set; }

        [ForeignKey("Idstanovi")]
        public Stan Stan { get; set; }

        [ForeignKey("Idzakupci")]
        public Zakupac Zakupac { get; set; }
    }


