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
            .ForCtorParam("Idstanovi", opt => opt.MapFrom(src => src.Idstanovi))
            .ForCtorParam("Kvadratura", opt => opt.MapFrom(src => src.Kvadratura))
            .ForCtorParam("Adresa", opt => opt.MapFrom(src => src.Adresa ?? ""))
            .ForCtorParam("Oprema", opt => opt.MapFrom(src => src.Oprema ?? ""))
            .ForCtorParam("Slika", opt => opt.MapFrom(src => PutanjaDatoteke(src)));
            CreateMap<StanDTOInsertUpdate, Stan>();

            CreateMap<Zakupac, ZakupacDTORead>();
            CreateMap<ZakupacDTOInsertUpdate, Zakupac>();

            CreateMap<Najam, NajamDTORead>()
                .ForCtorParam("StanAdresaNaziv", opt => opt.MapFrom(src => src.Stan.Adresa))
                .ForCtorParam("ZakupacImePrezime", opt => opt.MapFrom(src => src.Zakupac.Ime + " " + src.Zakupac.Prezime));

            CreateMap<NajamDTOInsertUpdate, Najam>();

        }

        private static string? PutanjaDatoteke(Stan e)
        {
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string slika = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "stan" + ds + e.Idstanovi + ".png");
                return File.Exists(slika) ? "/slike/stanovi/" + e.Idstanovi + ".png" : null;
            }
            catch
            {
                return null;
            }
        }
    }
}
