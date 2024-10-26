using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;
using NekretnineZellAmSee.Models.DTO;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace NekretnineZellAmSee.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StanController(NekretnineZellAmSeeContext context, IMapper mapper) : NekretnineZellAmSeeController(context, mapper)
    {
        //RUTE*************************************************************************************************************
        [HttpGet]
        public ActionResult<List<StanDTORead>> Get()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<StanDTORead>>(_context.Stanovi));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        //*************************************************************************************


        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<StanDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Stan? e;
            try
            {
                e = _context.Stanovi.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Stan ne postoji u bazi" });
            }
            return Ok(_mapper.Map<StanDTORead>(e));
        }

        //*************************************************************************************


        [HttpPost]
        public IActionResult Post(StanDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Stan>(dto);
                _context.Stanovi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<StanDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //*************************************************************************************

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, StanDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Stan? e;
                try
                {
                    e = _context.Stanovi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Stan ne postoji u bazi" });
                }
                e = _mapper.Map(dto, e);
                _context.Stanovi.Update(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //*************************************************************************************

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Stan? e;
                try
                {
                    e = _context.Stanovi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Smjer ne postoji u bazi");
                }
                _context.Stanovi.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        // Dodavanje funkcije traženja i straničenja********************************************************************************************+

        [HttpGet]
        [Route("traziStranicenje/{stranica}")]
        public IActionResult TrazistanStranicenje(int stranica, string uvjet = "")
        {
            var poStranici = 4;
            uvjet = uvjet.ToLower();
            try
            {
                IEnumerable<Stan> query = _context.Stanovi.Skip((poStranici * stranica) - poStranici);

                var niz = uvjet.Split(" ");
                foreach (var s in uvjet.Split(" "))
                {
                    query = query.Where(p => p.Adresa.ToLower().Contains(s));
                }

                query = query.Take(poStranici)
                .OrderBy(p => p.Adresa);

                var stanovi = query.ToList();
                    return Ok(_mapper.Map<List<StanDTORead>>(stanovi));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //*****************************************************************************************************************************+

        [HttpPut]
        [Route("postaviSliku/{sifra:int}")]
        public IActionResult PostaviSliku(int sifra, SlikaDTO slika)
        {
            if (sifra <= 0)
            {
                return BadRequest("Šifra mora biti veća od nula (0)");
            }
            if (slika.Base64 == null || slika.Base64?.Length == 0)
            {
                return BadRequest("Slika nije postavljena");
            }
            var p = _context.Stanovi.Find(sifra);
            if (p == null)
            {
                return BadRequest("Ne postoji stan s šifrom " + sifra + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "stan");
                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + sifra + ".png");
                System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(slika.Base64!));
                return Ok("Uspješno pohranjena slika");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }






    }
}





    