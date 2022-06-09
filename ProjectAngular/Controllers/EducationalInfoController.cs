using Microsoft.AspNetCore.Mvc;
using ProjectAngular.Models;
using ProjectAngular.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAngular.Controllers
{
    public class EducationalInfoController : Controller
    {
        private readonly IService<EducationalInfo> _service;
        public EducationalInfoController()
        {
            _service = new Service<EducationalInfo>();
        }
        public IActionResult Index()
        {
            return Json(_service.GetAll());
        }

        [HttpPost]
        public IActionResult Create([FromBody]EducationalInfo educationalInfo)
        {
            _service.Insert(educationalInfo);
            return Ok();
        }

        [HttpGet]
        public IActionResult Edit(int Id)
        {
            EducationalInfo toEdit = _service.GetById(Id);
            return View(toEdit);
        }

        [HttpPut]
        public IActionResult Edit([FromBody]EducationalInfo educationalInfo)
        {
            _service.Update(educationalInfo);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int Id)
        {
            _service.Delete(Id);
            return Ok();
        }
    }
}
