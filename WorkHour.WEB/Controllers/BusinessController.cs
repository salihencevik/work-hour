using System;
using System.Collections.Generic;
using System.Linq;
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
    public class BusinessController : BaseEntityController<Business,BusinessModel, BusinessModel, IUnitofWork>
    {
        public BusinessController(IUnitofWork unit) : base(unit)
        {

        }

        protected override IQueryable<BusinessModel> GetQuery()
        {
          return GetSearchQuery();
        }

        protected override IQueryable<BusinessModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<Business>().GetAll().Where(f => f.IsDeleted == false)
                         join ip in _Unit.GetRepository<Project>().GetAll().Where(f => f.IsDeleted == false) on r.ProjectId equals ip.Id into emptyProject
                         from project in emptyProject.DefaultIfEmpty()
                         join cs in _Unit.GetRepository<Customer>().GetAll().Where(f => f.IsDeleted == false) on r.CustomerId equals cs.Id into emptyCustomer
                         from customer in emptyCustomer.DefaultIfEmpty()
                         select new BusinessModel()
                         {
                             Name = r.Name,
                             Priority = r.Priority,
                             CustomerName = customer.CustomerName,
                             EndDate = r.EndDate,
                             Explanation = r.Explanation,
                             IsApprove = r.IsApprove,
                             LastDateStudied = r.LastDateStudied,
                             ProjectName = project.Name,
                             StartDate = r.StartDate,
                             Status = r.Status,
                             TaskExplanation = r.TaskExplanation,
                             Time = r.Time,
                             UserId = r.UserId,
                             Id = r.Id,
                             CreateUserId = r.CreateUserId,
                             CreateDate = r.CreateDate,
                             UpdateUserId = r.UpdateUserId,
                             UpdateDate = r.UpdateDate
                         });
            return query;
        }
    }
}
