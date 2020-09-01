using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkHour.DataAccess.DataAccess.Abstract;

namespace WorkHour.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        internal readonly IUnitofWork _unit;
        public MenuController(IUnitofWork unit)
        {
            _unit = unit;
        }
        [HttpGet]
        public IActionResult GetMenus()
        {
            var query = _unit.Menus.GetAll().ToList();
            return Ok(query);
        }
    }
}
