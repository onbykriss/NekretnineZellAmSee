using AutoMapper;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;
using NekretnineZellAmSee.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http.HttpResults;

namespace NekretnineZellAmSee.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NajamController : ControllerBase
    {
        private readonly NekretnineZellAmSeeContext _context;
        private readonly IMapper _mapper;

        public NajamController(NekretnineZellAmSeeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

      

        [HttpGet]
        public ActionResult<List<NajamDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<NajamDTORead>>(_context.Najmovi.Include(g => g.Stan).Include(g => g.Zakupac)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

       //***********************************************************************************************************

        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<NajamDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _context.Najmovi.Include(g => g.Stan).FirstOrDefault(g => g.Idnajam == sifra);
                if (e == null)
                {
                    return NotFound(new { poruka = "Najam ne postoji u bazi" });
                }
                return Ok(_mapper.Map<NajamDTOInsertUpdate>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //***********************************************************************************************************

        [HttpPost]
        public IActionResult Post(NajamDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var es = _context.Stanovi.Find(dto.Idstanovi);
                if (es == null)
                {
                    return NotFound(new { poruka = "Stan na najmovima ne postoji u bazi" });
                }
                var e = _mapper.Map<Najam>(dto);
                e.Stan = es;
                _context.Najmovi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<NajamDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //***********************************************************************************************************

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, NajamDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _context.Najmovi.Include(g => g.Stan).FirstOrDefault(x => x.Idnajam == sifra);
                if (e == null)
                {
                    return NotFound(new { poruka = "Najam ne postoji u bazi" });
                }
                var es = _context.Stanovi.Find(dto.Idstanovi);
                if (es == null)
                {
                    return NotFound(new { poruka = "Stan na najmovima ne postoji u bazi" });
                }
                e = _mapper.Map(dto, e);
                e.Stan = es;
                _context.Najmovi.Update(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //***********************************************************************************************************

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
                var e = _context.Najmovi.Find(sifra);
                if (e == null)
                {
                    return NotFound("Najam ne postoji u bazi");
                }
                _context.Najmovi.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //***********************************************************************************************************

 

        //***********************************************************************************************************


        
        //***********************************************************************************************************

       
        
    }
}
