using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WorkHour.core;
using WorkHour.Data.Entity;
using WorkHour.DataAccess.DataAccess.Abstract;
using WorkHour.WEB.Model;

namespace WorkHour.WEB.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class PersonelController : BaseEntityController<Personel, PersonelModel, PersonelModel, IUnitofWork>
    {
        public PersonelController(IUnitofWork unit) : base(unit)
        {
        }

        protected override IEnumerable<PersonelModel> GetQuery()
        {
            var query = (from r in _Unit.GetRepository<Personel>().GetAll().Where(f => f.Deleted == false)
                         select new PersonelModel()
                         {
                             Adress = r.Adress,
                             Email = r.Email,
                             Mission = r.Mission,
                             Name = r.Name,
                             Id = r.Id,
                             Phone = r.Phone
                         }).ToList();
            return query;
        }

        protected override IEnumerable<PersonelModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<Personel>().GetAll().Where(f => f.Deleted == false)
                         select new PersonelModel()
                         {
                             Adress = r.Adress,
                             Email = r.Email,
                             Mission = r.Mission,
                             Name = r.Name,
                             Id = r.Id,
                             Phone = r.Phone
                         }).ToList();
            return query;
        }
    }
}
