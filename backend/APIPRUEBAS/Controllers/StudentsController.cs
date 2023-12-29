using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using Microsoft.EntityFrameworkCore;
using APIPRUEBAS.Models;

using Microsoft.AspNetCore.Cors;
using System.Text;

namespace APIPRUEBAS.Controllers
{

    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        public readonly DBAPIContext _dbcontext;

        public StudentsController(DBAPIContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetStudentList()
        {
            List<Student> students = new List<Student>();
            List<FamilyMember> familyMembers = new List<FamilyMember>();

            try
            {
                students = _dbcontext.Student.ToList();

                foreach(var student in students)
                {
                    familyMembers = _dbcontext.FamilyMember.Where(fm => fm.studentID == student.ID).ToList();

                    if (familyMembers != null)
                    {
                        student.familyMembers = familyMembers;

                    }
                }

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", data = students });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, data = students });

            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetStudents(int? id)
        {
            Student student = new Student();

            if (id == null)
            {
                return BadRequest("Student id can not be null");

            }

            try
            {

                student = _dbcontext.Student.Find(id);

                if (student == null)
                {
                    return BadRequest("Student not found!");

                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", data = student });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, data = student });

            }
        }

        [HttpGet]
        [Route("{id}/Nationality")]
        public IActionResult GetStudentNationality(int? id)
        {
            Student _student = new Student();
            StringBuilder studentNationality = new StringBuilder();

            try
            {


                if (id == null)
                {
                    return BadRequest("Student id can not be null");

                }

                _student = _dbcontext.Student.Find(id);

                if (_student == null)
                {
                    return BadRequest("Student not found!");

                };

               /* if (_student.nationalID != null)
                {
                    int nationalID = _student.nationalID;

                    studentNationality = _dbcontext.Nationality.Find(nationalID);
                }
*/

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", data = studentNationality });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, data = studentNationality });

            }
        }

        [HttpGet]
        [Route("{id}/FamilyMembers")]
        public IActionResult GetFamilyMembers(int? id)
        {
            List<FamilyMember> familyMembers = new List<FamilyMember>();

            if (id == null)
            {
                return BadRequest("Student id can not be null");

            }

            try
            {
                familyMembers = _dbcontext.FamilyMember.Where(fm => fm.studentID == id).ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", data = familyMembers });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, data = familyMembers });

            }
        }

        [HttpPost]
        [Route("")]
        public IActionResult AddStudent([FromBody] Student student)
        {

            try
            {
               // student.nationalID = student.nationality.id;
                _dbcontext.Student.Add(student);
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
        public IActionResult UpdateStudent(int? id, [FromBody] Student updatedStudent)
        {


            try
            {
                Student student = _dbcontext.Student.Find(id);

                if (student == null)
                {
                    return BadRequest("Student not found!");

                };

                _dbcontext.Student.Update(updatedStudent);
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }

        }

        [HttpPut]
        [Route("{studentID}/Nationality/{nationalityID}")]
        public IActionResult UpdateStudentNationality(int studentID, int nationalityID)
        {


            try
            {
                Student student = _dbcontext.Student.Find(studentID);

                if (student == null)
                {
                    return BadRequest("Student not found!");

                };

                if (nationalityID != null)
                {
                    return BadRequest("Nationality not valid!");
                }

                student.nationalID = nationalityID;

                _dbcontext.Student.Update(student); 
                _dbcontext.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message });
            }




        }

        [HttpPost]
        [Route("{studentID}/FamilyMembers/")]
        public IActionResult AddFamilyMember(int studentID, [FromBody] FamilyMember familyMember)
        {


            try
            {
                familyMember.studentID = studentID;
                _dbcontext.FamilyMember.Add(familyMember);
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
