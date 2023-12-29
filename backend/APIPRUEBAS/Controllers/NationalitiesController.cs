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
    public class NationalitiesController : ControllerBase
    {
        public readonly DBAPIContext _dbcontext;

        public NationalitiesController(DBAPIContext _context) {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetNationalities()
        {
            List<Nationality> nationalities = new List<Nationality>();

            try
            {
                nationalities = _dbcontext.Nationality.ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", data = nationalities });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message});

            }
        }

    }

}
