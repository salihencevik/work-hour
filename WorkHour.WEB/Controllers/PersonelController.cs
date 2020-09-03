using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkHour.Core;
using WorkHour.DataAccess.DataAccess.Abstract;
using WorkHour.WEB.Model;

namespace WorkHour.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PersonelController : Controller
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





        [HttpPost("Delete")]
        [Route("/Personel/Delete")]
        public virtual ActionResult Delete([FromBody] int id)
        {
            return Execute(() =>
            {
                _unit.Personels.Delete(id);

            });
        }



        protected ActionResult Execute(Action action)
        {
            try
            {
                action();

                return Json(new WorkHourResponse(ResponseType.Success));
            }
            catch (Exception exp)
            {

                return Json(new WorkHourResponse(ResponseType.Error, exp.Message));
            }
        }
    }
}
