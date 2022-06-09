using Microsoft.AspNetCore.Mvc;
using ProjectAngular.Models;
using ProjectAngular.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAngular.Controllers
{
    public class HomeController : Controller
    {
        public EmployeeContext _db = new EmployeeContext();
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult getDepartments()
        {
            return Json(_db.Departments.ToList());
        }


        public IActionResult getDivision()
        {
            return Json(_db.Divisions.ToList());
        }

        public IActionResult getDistrict(int id)
        {
            return Json(_db.Districts.Where(e => e.DivisionId == id).ToList());
        }

        public IActionResult getAllInfo()
        {
            var d = from div in _db.Divisions
                    join dis in _db.Districts on div.DivisionId equals dis.DivisionId
                    join p in _db.PersonalInfos on dis.DistrictId equals p.DistrictId
                    join edu in _db.EducationalInfos
                    on p.EmployeeId equals edu.EmployeeId
                    join em in _db.EmploymentInfos on edu.EmployeeId equals em.EmployeeId
                    join dep in _db.Departments on em.DepartmentId equals dep.DepartmentId
                    select new
                    {
                        DivName = div.DivName,
                        DistrictName = dis.DistrictName,
                        EmployeeId = p.EmployeeId,
                        Name = p.Name,
                        DoB = p.DoB,
                        Gender = p.Gender,
                        Phone = p.Phone,
                        Email = p.Email,
                        Address = p.Address,
                        HighestDegree = edu.HighestDegree,
                        Subject = edu.Subject,
                        CGPA = edu.CGPA,
                        Training = edu.Training,
                        DepName = dep.DepName,
                        Designation = em.Designation,
                        Department = dep.DepName,
                        Image = p.Image
                    };
            return Json(d.ToList());
        }


        //"select p.EmployeeId, p.Name, p.DoB, p.Gender, p.Phone, p.Email, p.Address, div.DivName, dis.DistrictName,
        //edu.HighestDegree, edu.Subject, edu.CGPA," +
        //        "edu.Training, dep.DepName, em.Designation, em.Salary, p.Image from Divisions as div join
        //        Districts as dis on div.DivisionId =dis.DivisionId join" +
        //        "PersonalInfos as p on dis.DistrictId = p.DistrictId join EducationalInfos
        //        as edu on p.EmployeeId = edu.EmployeeId join" +
        //        "EmploymentInfos as em on edu.EmployeeId = em.EmployeeId join Departments as
        //        dep on em.DepartmentId = dep.DepartmentId";
    }
}
