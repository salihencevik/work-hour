using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkHour.core;
using WorkHour.Data.Entity;
using WorkHour.DataAccess.DataAccess.Abstract;
using WorkHour.WEB.Model;

namespace WorkHour.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MenuController : BaseEntityController<Menu,MenuModel, MenuModel, IUnitofWork>
    {
        internal readonly IUnitofWork _unit;
        public MenuController(IUnitofWork unit):base(unit)
        {
        }

        protected override IEnumerable<MenuModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<Menu>().GetAll()
                         select new MenuModel()
                         {
                             Id = r.Id,
                             Name = r.Name,
                             Datatarget = r.Datatarget,
                             icon = r.icon,
                             MenuId = r.MenuId,
                             Status = r.Status,
                             ParentId = r.ParentId,
                             Url = r.Url,
                             
                         });
            return query;
        }
    }
}
