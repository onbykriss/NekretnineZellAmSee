using AutoMapper;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;
using Microsoft.AspNetCore.Mvc;


namespace NekretnineZellAmSee.Controllers
{
    public abstract class NekretnineZellAmSeeController : ControllerBase
    {
        // dependecy injection
        // 1. definiraš privatno svojstvo
        protected readonly NekretnineZellAmSeeContext _context;
        protected readonly IMapper _mapper;

        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public NekretnineZellAmSeeController(NekretnineZellAmSeeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    }
}

