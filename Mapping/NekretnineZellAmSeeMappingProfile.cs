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
        }
    }
}
