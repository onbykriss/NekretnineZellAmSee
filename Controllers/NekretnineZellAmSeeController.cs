using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;

namespace NekretnineZellAmSee.Controllers
{
    public abstract class NekretnineZellAmSeeController(NekretnineZellAmSeeContext context, IMapper mapper) : ControllerBase
    {
        // dependecy injection
        // 1. definiraš privatno svojstvo
        protected readonly NekretnineZellAmSeeContext _context = context;
        protected readonly IMapper _mapper = mapper;
    }
}

