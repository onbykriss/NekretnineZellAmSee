﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;
using NekretnineZellAmSee.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace NekretnineZellAmSee.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ZakupacController(NekretnineZellAmSeeContext context, IMapper mapper) : NekretnineZellAmSeeController(context, mapper)
    {
        // RUTE*************************************************************************************************************
        [HttpGet]
        public ActionResult<List<ZakupacDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<ZakupacDTORead>>(_context.Zakupci));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //************************************************************************************************************************

        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<ZakupacDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Zakupac? e;
            try
            {
                e = _context.Zakupci.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Zakupac ne postoji u bazi" });
            }
            return Ok(_mapper.Map<ZakupacDTORead>(e));
        }

        //************************************************************************************************************************

        [HttpPost]
        public IActionResult Post(ZakupacDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Zakupac>(dto);
                _context.Zakupci.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<ZakupacDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //************************************************************************************************************************

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, ZakupacDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Zakupac? e;
                try
                {
                    e = _context.Zakupci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Zakupac ne postoji u bazi" });
                }
                e = _mapper.Map(dto, e);
                _context.Zakupci.Update(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //************************************************************************************************************************

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
                Zakupac? e;
                try
                {
                    e = _context.Zakupci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Zakupac ne postoji u bazi");
                }
                _context.Zakupci.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //************************************************************************************************************************

        [HttpGet]
        [Route("traziStranicenje/{stranica}")]
        public IActionResult TraziZakupacStranicenje(int stranica, string uvjet = "")
        {
            var poStranici = 8;
            uvjet = uvjet.ToLower();
            try
            {
                var zakupci = _context.Zakupci
                    .Where(p => EF.Functions.Like(p.Ime.ToLower(), "%" + uvjet + "%")
                                || EF.Functions.Like(p.Prezime.ToLower(), "%" + uvjet + "%"))
                    .Skip((poStranici * stranica) - poStranici)
                    .Take(poStranici)
                    .OrderBy(p => p.Prezime)
                    .ToList();
                return Ok(_mapper.Map<List<ZakupacDTORead>>(zakupci));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

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
            var p = _context.Zakupci.Find(sifra);
            if (p == null)
            {
                return BadRequest("Ne postoji zakupac s šifrom " + sifra + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "zakupac");
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