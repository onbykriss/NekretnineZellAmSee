using Microsoft.AspNetCore.Mvc;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;

namespace NekretnineZellAmSee.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StanoviController : ControllerBase
    {
        private readonly NekretnineContext _context;

        public StanoviController(NekretnineContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Stanovi);
        }

        //*************************************************************************************


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Stanovi.Find(sifra));
        }

        //*************************************************************************************


        [HttpPost]
        public IActionResult Post(Stan Stanovi)
        {
            _context.Stanovi.Add(Stanovi);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, Stanovi);
        }
        
        //*************************************************************************************

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Stan Stan)
        {
            var stanBaza = _context.Stanovi.Find(sifra);

            // za sada ručno, kasnije mapper
           
            stanBaza.Kvadratura = Stan.Kvadratura;
            stanBaza.Adresa = Stan.Adresa;
            stanBaza.Oprema = Stan.Oprema;
            stanBaza.Slika = Stan.Slika;

            _context.Stanovi.Update(stanBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });
        }

        //*************************************************************************************

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var stanBaza = _context.Stanovi.Find(sifra);

            _context.Stanovi.Remove(stanBaza);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}