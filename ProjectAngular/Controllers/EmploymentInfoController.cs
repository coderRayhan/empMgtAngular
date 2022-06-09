using Microsoft.AspNetCore.Mvc;
using ProjectAngular.Models;
using ProjectAngular.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAngular.Controllers
{
    public class EmploymentInfoController : Controller
    {
        private readonly IService<EmploymentInfo> _service;
        public EmploymentInfoController()
        {
            _service = new Service<EmploymentInfo>();
        }
        public IActionResult Index()
        {
            return Json(_service.GetAll());
        }

        [HttpPost]
        public IActionResult Create([FromBody]EmploymentInfo employmentInfo)
        {
            _service.Insert(employmentInfo);
            return Ok();
        }

        [HttpGet]
        public IActionResult Edit(int Id)
        {
            EmploymentInfo toEdit = _service.GetById(Id);
            return View(toEdit);
        }

        [HttpPut]
        public IActionResult Edit([FromBody]EmploymentInfo employmentInfo)
        {
            _service.Update(employmentInfo);
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
