using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Models;
using NekretnineZellAmSee.Models.DTO;

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
                var najmovi = _context.Najmovi
                    .Include(n => n.Stan)
                    .Include(n => n.Zakupac)
                    .ToList();

                var najmoviDTO = _mapper.Map<List<NajamDTORead>>(najmovi);
                return Ok(najmoviDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //*************************************************************************************************************

        [HttpGet("{idnajmovi:int}")]
        public ActionResult<NajamDTORead> GetBySifra(int idnajmovi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Najam? najam;
            try
            {
                najam = _context.Najmovi
                    .Include(n => n.Stan)
                    .Include(n => n.Zakupac)
                    .FirstOrDefault(n => n.idnajmovi == idnajmovi);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

            if (najam == null)
            {
                return NotFound(new { poruka = "Najam ne postoji u bazi" });
            }

            return Ok(_mapper.Map<NajamDTORead>(najam));
        }

        //**********************************************************************************************************

        [HttpPost]
        public IActionResult Post(NajamDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Stan? stan;
            Zakupac? zakupac;


            try
            {
                stan = _context.Stanovi.Find(dto.idstanovi);
                zakupac = _context.Zakupci.Find(dto.idzakupci);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

            if (stan == null || zakupac == null)
            {
                return NotFound(new { poruka = "Stan ili zakupac ne postoji u bazi" });
            }

            try
            {
                var najam = _mapper.Map<Najam>(dto);
                najam.Stan = stan;
                najam.Zakupac = zakupac;
                _context.Najmovi.Add(najam);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetBySifra), new { idnajmovi = najam.idnajmovi }, _mapper.Map<NajamDTORead>(najam));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        //****************************************************************************************************************

        [HttpPut("{idnajmovi:int}")]
        [Produces("application/json")]
        public IActionResult Put(int idnajmovi, NajamDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Najam? najam;
            try
            {
                najam = _context.Najmovi
                    .Include(n => n.Stan)
                    .Include(n => n.Zakupac)
                    .FirstOrDefault(n => n.idnajmovi == idnajmovi);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

            if (najam == null)
            {
                return NotFound(new { poruka = "Najam ne postoji u bazi" });
            }

            Stan? stan;
            Zakupac? zakupac;
            try
            {
                stan = _context.Stanovi.Find(dto.idstanovi);
                zakupac = _context.Zakupci.Find(dto.idzakupci);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

            if (stan == null || zakupac == null)
            {
                return NotFound(new { poruka = "Stan ili zakupac ne postoji u bazi" });
            }

            najam = _mapper.Map(dto, najam);
            najam.Stan = stan;
            najam.Zakupac = zakupac;
            _context.Najmovi.Update(najam);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno promijenjeno" });
        }

        //**************************************************************************************************************

        [HttpDelete("{idnajmovi:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int idnajmovi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Najam? najam;
                try
                {
                    najam = _context.Najmovi.Find(idnajmovi);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (najam == null)
                {
                    return NotFound(new { poruka = "Najam ne postoji u bazi" });
                }
                _context.Najmovi.Remove(najam);
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