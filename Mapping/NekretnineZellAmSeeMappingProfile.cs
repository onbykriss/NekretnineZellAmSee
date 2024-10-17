using AutoMapper;
using NekretnineZellAmSee.Models;
using NekretnineZellAmSee.Models.DTO;

namespace NekretnineZellAmSee.Mapping
{
    public class NekretnineZellAmSeeMappingProfile : Profile
    {
        public NekretnineZellAmSeeMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Stan, StanDTORead>();
            CreateMap<StanDTOInsertUpdate, Stan>();

            CreateMap<Zakupac, ZakupacDTORead>();
            CreateMap<ZakupacDTOInsertUpdate, Zakupac>();

            CreateMap<Najam, NajamDTORead>()
            .ForCtorParam("StanAdresaNaziv", opt => opt.MapFrom(src => src.Stan.Adresa))

            .ForCtorParam("ZakupacImePrezime", opt => opt.MapFrom(src => src.Zakupac.Ime + " " + src.Zakupac.Prezime));

            CreateMap<NajamDTOInsertUpdate, Najam>();
        }
    }
}
