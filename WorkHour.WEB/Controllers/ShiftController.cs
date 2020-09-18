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
    public class ShiftController : BaseEntityController<Shift, ShiftModel, ShiftModel, IUnitofWork>
    {
        public ShiftController(IUnitofWork unit) : base(unit)
        {

        }
        protected override IQueryable<ShiftModel> GetQuery()
        {
          return  GetSearchQuery();
        }

        protected override IQueryable<ShiftModel> GetSearchQuery()
        { 
            var query = (from r in _Unit.GetRepository<Shift>().GetAll().Where(f => f.IsDeleted == false)
                         select new ShiftModel()
                         {
                             Id = r.Id,
                             UserId = r.UserId,
                             WorkConfirmation = r.WorkConfirmation,
                             Area = r.Area, 
                             Explanation = r.Explanation,
                             StartTime = r.StartTime.ToString(),
                             FinishTime =r.FinishTime.ToString(),
                             FinishDate = r.FinishDate,
                             StartDate = r.StartDate,
                             CreateDate = r.CreateDate,
                             CreateUserId = r.CreateUserId,
                             UpdateDate = r.UpdateDate,
                             UpdateUserId = r.UpdateUserId
                         });
            return query;
        }
        public override ActionResult SaveItem([FromBody] ShiftModel model)
        {
            return Execute(() =>
            {
                model.UserId = model.UserId == 0 ? SessionManager.LoginModel.Id : model.UserId; 
                var item = model.GetPropertyValues<Shift>();
                return model;
            }); 
        }
    }
   
}
