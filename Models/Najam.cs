using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NekretnineZellAmSee.Models
{
    public class Najam
    {

            [Key]
            public int Idnajam { get; set; }
            public int? Idstanovi { get; set; }
            public int? Idzakupci { get; set; }
            public DateTime? DatumPocetka { get; set; }
            public DateTime? DatumZavrsetka { get; set; }
            public double? Cijena { get; set; }
            public string? Napomena { get; set; }

            [ForeignKey("Idstanovi")]
            public Stan Stan { get; set; }
            [ForeignKey("Idzakupci")]
            public Zakupac Zakupac { get; set; }
        
    }
}
