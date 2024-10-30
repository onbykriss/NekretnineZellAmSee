using AutoMapper;
using NekretnineZellAmSee.Models;
using NekretnineZellAmSee.Models.DTO;

namespace NekretnineZellAmSee.Mapping
{
    public class NekretnineZellAmSeeMappingProfile : Profile
    {
        public NekretnineZellAmSeeMappingProfile()
        {
            
            CreateMap<Stan, StanDTORead>()
            .ForCtorParam("idstanovi", opt => opt.MapFrom(src => src.idstanovi))
            .ForCtorParam("Kvadratura", opt => opt.MapFrom(src => src.Kvadratura))
            .ForCtorParam("Adresa", opt => opt.MapFrom(src => src.Adresa ?? ""))
            .ForCtorParam("Oprema", opt => opt.MapFrom(src => src.Oprema ?? ""))
            .ForCtorParam("Slika", opt => opt.MapFrom(src => PutanjaDatoteke(src.idstanovi,"stan")));
            CreateMap<StanDTOInsertUpdate, Stan>();

            CreateMap<Zakupac, ZakupacDTORead>()
            .ForCtorParam("Slika", opt => opt.MapFrom(src => PutanjaDatoteke(src.idzakupci, "zakupac"))); ;

            CreateMap<ZakupacDTOInsertUpdate, Zakupac>();

            CreateMap<Najam, NajamDTORead>()
                .ForCtorParam("StanAdresaNaziv", opt => opt.MapFrom(src => src.Stan.Adresa))
                .ForCtorParam("ZakupacImePrezime", opt => opt.MapFrom(src => src.Zakupac.Ime + " " + src.Zakupac.Prezime));

            CreateMap<Najam, NajamDTOInsertUpdate>()
                .ForCtorParam("Idstanovi", opt => opt.MapFrom(src => src.Stan.idstanovi))
                .ForCtorParam("Idzakupci", opt => opt.MapFrom(src => src.Zakupac.idzakupci));

            CreateMap<NajamDTOInsertUpdate, Najam>();

        }

        private static string? PutanjaDatoteke(int id,string dirSlika)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + dirSlika + ds + id + ".png");
                return File.Exists(slika) ? "/slike/"  + dirSlika + "/" + id + ".png" : null;
            }
            catch
            {
                return null;
            }
        }
    }
}
