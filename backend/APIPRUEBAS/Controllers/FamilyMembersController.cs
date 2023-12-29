using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;
using APIPRUEBAS.Models;

using Microsoft.AspNetCore.Cors;

namespace APIPRUEBAS.Controllers
{

    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyMembersController : ControllerBase
    {
        public readonly DBAPIContext _dbcontext;

        public FamilyMembersController(DBAPIContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("{familyMemberID}/Nationality/")]
        public IActionResult GetFamilyMemberNationality(int familyMemberID)
        {
            FamilyMember familyMember = new FamilyMember();
            Nationality familyMemberNationality = new Nationality();

            try
            {
                familyMember = _dbcontext.FamilyMember.Find(familyMemberID);

                if (familyMember == null)
                {
                    return BadRequest("Family member not found!");
                }

                familyMemberNationality = _dbcontext.Nationality.Find(familyMember.nationalID);

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", data = familyMemberNationality });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, data = familyMemberNationality });

            }
        }

        [HttpPut]
        [Route("{familyMemberID}/Nationality/{nationalityID}")]
        public IActionResult UpdateFamilyMemberNationality(int familyMemberID, int nationalityID)
        {
            FamilyMember familyMember = new FamilyMember();
            try
            {
                familyMember = _dbcontext.FamilyMember.Find(familyMemberID);

                if (familyMember == null)
                {
                    return BadRequest("Family member not found!");

                }

                familyMember.nationalID = nationalityID;

                _dbcontext.FamilyMember.Update(familyMember);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });

            }
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateFamilyMember([FromBody] FamilyMember familyMember, int id)
        {

            try
            {
                FamilyMember existingFamilyMember = _dbcontext.FamilyMember.Find(id);

                if (existingFamilyMember == null)
                {
                    return BadRequest("Family member not found!");
                }

                _dbcontext.FamilyMember.Update(familyMember);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }

        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteFamilyMember(int id)
        {

            try
            {
                FamilyMember existingFamilyMember = _dbcontext.FamilyMember.Find(id);

                if (existingFamilyMember == null)
                {
                    return BadRequest("Family member not found!");
                }

                _dbcontext.FamilyMember.Remove(existingFamilyMember);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }

        }

    }
}