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
            var query = (from r in _Unit.GetRepository<Shift>().GetAll().Where(f => f.IsDeleted == false)
                         select new ShiftModel()
                         {
                             Area = r.Area,
                             CreateDate = r.CreateDate,
                             CreateUserId = r.CreateUserId,
                             Explanation = r.Explanation,
                             FinishTime = r.FinishTime,
                             Id = r.Id,
                             StartTime = r.StartTime,
                             UpdateDate = r.UpdateDate,
                             UpdateUserId = r.UpdateUserId,
                             UserId = r.UserId,
                             WorkConfirmation = r.WorkConfirmation
                         });
            return query;
        }

        protected override IQueryable<ShiftModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<Shift>().GetAll().Where(f => f.IsDeleted == false)
                         select new ShiftModel()
                         {
                             Area = r.Area,
                             CreateDate = r.CreateDate,
                             CreateUserId = r.CreateUserId,
                             Explanation = r.Explanation,
                             FinishTime = r.FinishTime,
                             Id = r.Id,
                             StartTime = r.StartTime,
                             UpdateDate = r.UpdateDate,
                             UpdateUserId = r.UpdateUserId,
                             UserId = r.UserId,
                             WorkConfirmation = r.WorkConfirmation
                         });
            return query;
        }
        public override ActionResult SaveItem([FromBody] ShiftModel model)
        {
            return Execute(() =>
            {
                model.StartTime = model.StartDate.Value.Add(model.StartTimer);
                model.FinishTime = model.FinishDate.Value.Add(model.FinishTimer);
                model.UserId = model.UserId == 0 ? SessionManager.LoginModel.Id : model.UserId; 
                var item = model.GetPropertyValues<Shift>();
                return model;
            }); 
        }
    }
   
}
