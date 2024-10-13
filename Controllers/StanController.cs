using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;
using NekretnineZellAmSee.Models.DTO;

namespace NekretnineZellAmSee.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StanController(NekretnineZellAmSeeContext context, IMapper mapper) : NekretnineZellAmSeeController(context,mapper)
    {
        //RUTE
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
    }
}