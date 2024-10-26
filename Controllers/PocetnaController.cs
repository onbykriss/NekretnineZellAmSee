using AutoMapper;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace NekretnineZellAmSee.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class PocetnaController(NekretnineZellAmSeeContext _context, IMapper _mapper) : ControllerBase
    {



        [HttpGet]
        [Route("DostupniStanovi")]
        public ActionResult<List<StanDTORead>> DostupniStanovi()
        {
            try
            {

                var stanovi = _context.Stanovi
                    .ToList();

                var lista = new List<object>();
                foreach (var stan in stanovi)
                {
                    lista.Add(new { Adresa = stan.Adresa });
                }

                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }



        [HttpGet]
        [Route("UkupnoZakupca")]
        public IActionResult UkupnoZakupca()
        {
            try
            {
                return Ok(new { poruka = _context.Zakupci.Count() });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }






    }
}


