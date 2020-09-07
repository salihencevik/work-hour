using System.Collections.Generic;
using System.Linq;
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
    public class PersonelController : BaseEntityController<Personel, PersonelModel, PersonelModel, IUnitofWork>
    {
        public PersonelController(IUnitofWork unit) : base(unit)
        {
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
        public override ActionResult GetItem(int id)
        {
            return Execute(() =>
            {
                var userResult = _Unit.GetRepository<Personel>().Get(f => f.Id == id);
                //var userModel = userResult.Item.CreateFrom<UserModel>();
                //userModel.Roles = roleService.Items.Where(t => t.UserId == id).Select(t => t.RoleId).ToList();
            });
        }

        protected override IEnumerable<PersonelModel> GetQuery()
        {
            throw new System.NotImplementedException();
        }


    }
}
