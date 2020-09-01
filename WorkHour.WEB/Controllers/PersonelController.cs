using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkHour.DataAccess.DataAccess.Abstract;
using WorkHour.WEB.Model;

namespace WorkHour.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PersonelController : ControllerBase
    {
        internal readonly IUnitofWork _unit;
        public PersonelController(IUnitofWork unit)
        {
            _unit = unit;
        }
        [HttpGet]
        [Route("getItems")]
        public IActionResult getItems()
        {
            var query = (from r in _unit.Personels.GetAll().Where(f => f.Deleted == false)
                        select new PersonelModel()
                        {
                            Adress = r.Adress,
                            Email = r.Email,
                            Mission = r.Mission,
                            Name = r.Name,
                            Id = r.Id,
                            Phone = r.Phone
                        }).ToList();
            return Ok(query);
        }
        [HttpGet]
        [Route("getItem/{id}")]
        public IActionResult getItem(int id)
            {
            var query = (from r in _unit.Personels.GetAll().Where(f => f.Deleted == false && f.Id == id)
                         select new PersonelModel()
                         {
                             Adress = r.Adress,
                             Email = r.Email,
                             Mission = r.Mission,
                             Name = r.Name,
                             Id = r.Id,
                             Phone = r.Phone
                         }).ToList();
            return Ok(query);
        }
    }
}
