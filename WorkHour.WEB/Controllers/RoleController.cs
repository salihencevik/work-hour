using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; 
using WorkHour.Core;
using WorkHour.Core.Abstract;
using WorkHour.Data; 
using WorkHour.Model;

namespace WorkHour.WEB.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class RoleController : BaseEntityController<Role, RoleModel, RoleModel, IUnitofWork>
    {
        public RoleController(IUnitofWork unit) : base(unit)
        {
        }
        protected override IEnumerable<RoleModel> GetQuery()
        {
            var query = (from r in _Unit.GetRepository<Role>().GetAll()
                         select new RoleModel()
                         { 
                             Name = r.Name,
                             Id = r.Id, 
                         }).ToList();
            return query;
        }

        protected override IEnumerable<RoleModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<Role>().GetAll()
                         select new RoleModel()
                         { 
                             Name = r.Name,
                             Id = r.Id, 
                         }).ToList();
            return query;
        }
    }
}
