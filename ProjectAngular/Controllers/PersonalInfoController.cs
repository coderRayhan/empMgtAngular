using Microsoft.AspNetCore.Mvc;
using ProjectAngular.Models;
using ProjectAngular.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAngular.Controllers
{
    public class PersonalInfoController : Controller
    {
        private readonly IService<PersonalInfo> _service;
        public PersonalInfoController()
        {
            _service = new Service<PersonalInfo>();
        }
        public IActionResult Index()
        {
            return Json(_service.GetAll());
        }

        [HttpPost]
        public IActionResult Create([FromBody]PersonalInfo personalInfo)
        {
            _service.Insert(personalInfo);
            return Ok();
        }

        [HttpGet]
        public IActionResult Edit(int Id)
        {
            PersonalInfo toEdit = _service.GetById(Id);
            return View(toEdit);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] PersonalInfo personalInfo)
        {
            _service.Update(personalInfo);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete([FromRoute]int Id)
        {
            _service.Delete(Id);
            return Ok();
        }
    }
}
