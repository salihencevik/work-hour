using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkHour.Core;
using WorkHour.Core.Abstract;
using WorkHour.Core.Helper;
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
                         where (Helper.AuthorityControl("Rapor.Admin") == false ? r.Id == SessionManager.LoginModel.Id : r.Id == r.Id)
                         select new ShiftModel()
                         {
                             Id = r.Id,
                             UserId = r.UserId,
                             WorkConfirmation = r.WorkConfirmation,
                             Area = r.Area,
                             Explanation = r.Explanation,
                             StartTimeText = r.StartTime.ToString(),
                             FinishTimeText = r.FinishTime.ToString(),
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
                model.StartTime = TimeSpan.Parse(model.StartTimeText);
                model.FinishTime = TimeSpan.Parse(model.FinishTimeText);
                if (model.Id == 0)
                {
                    model.UserId = model.UserId == 0 ? SessionManager.LoginModel.Id : model.UserId; 
                    var item = model.GetPropertyValues<Shift>();
                    item.CreateUserId = SessionManager.LoginModel.Id;
                    item.CreateDate = DateTime.Now;
                    var result = _Unit.GetRepository<Shift>().Add(item);
                    if (!result.IsSucceeded)
                    {
                        throw new Exception("Yeni mesai girişi başarısız.");
                    }
                    return model;
                }
                else
                {
                    var oldItem = _Unit.GetRepository<Shift>().Get(f => f.Id == model.Id);
                    oldItem.UpdateUserId = SessionManager.LoginModel.Id;
                    oldItem.UpdateDate = DateTime.Now;
                    model.GetPropertyValues<Shift>(ref oldItem); 
                    var result = _Unit.GetRepository<Shift>().Update(oldItem);
                    if (!result.IsSucceeded) {
                        throw new Exception("Güncelleme işlemi başarısız.");   }
                    return model;
                }
            });
        }
        [HttpPost]  
        [Route("Confirm")]
        public ActionResult Confirm([FromBody]int Id)
        {
            return Execute(() =>
            {
                var oldItem = _Unit.GetRepository<Shift>().Get(f => f.Id == Id);
                oldItem.WorkConfirmation = oldItem.WorkConfirmation == true ? false : true;
                string warn = oldItem.WorkConfirmation == true ? "Mesai girişi onayı kaldırma işlemi başarısız." : "Mesai girişi onaylama başarısız.";
                var result = _Unit.GetRepository<Shift>().Update(oldItem);
                if (!result.IsSucceeded)
                    throw new Exception(warn);
                return Id;
            });
        }
        [HttpPost]
        [Route("AllConfirm")]
        public ActionResult AllConfirm()
        {
            return Execute(() =>
            {
                var oldItem = _Unit.GetRepository<Shift>().GetAll(f => f.WorkConfirmation == false).ToList();
                foreach (var item in oldItem)
                {
                    item.WorkConfirmation = true;
                    var result = _Unit.GetRepository<Shift>().Update(item);
                    if (!result.IsSucceeded)
                        throw new Exception("Mesai girişi onaylama başarısız.");
                } 
            });
        }
    }
   
}
