using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkHour.Core;
using WorkHour.Core.Abstract;
using WorkHour.Data;
using WorkHour.Model.Customer;

namespace WorkHour.WEB.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class CustomerController : BaseEntityController<Customer, CustomerModel, CustomerModel, IUnitofWork>
    {
        public CustomerController(IUnitofWork unit) : base(unit)
        {
        }

        protected override IQueryable<CustomerModel> GetQuery()
        {
            var customers = _Unit.GetRepository<Customer>().GetAll().Where(x => x.IsDeleted == false);
            var query = (from c in customers
                         select new CustomerModel()
                         {
                             Id = c.Id,
                             Address = c.Address,
                             CustomerName = c.CustomerName,
                             Email = c.Email,
                             IsDeleted = c.IsDeleted,
                             Phone = c.Phone,
                             CreateDate = c.CreateDate,
                             CreateUserId = c.CreateUserId,
                             UpdateDate = c.UpdateDate,
                             UpdateUserId = c.UpdateUserId
                         });
            return query;
        }

        protected override IQueryable<CustomerModel> GetSearchQuery()
        {
            var customers = _Unit.GetRepository<Customer>().GetAll().Where(x => x.IsDeleted == false);
            var query = (from c in customers
                         select new CustomerModel()
                         {
                             Id = c.Id,
                             Address = c.Address,
                             CustomerName = c.CustomerName,
                             Email = c.Email,
                             IsDeleted = c.IsDeleted,
                             Phone = c.Phone,
                             CreateDate = c.CreateDate,
                             CreateUserId = c.CreateUserId,
                             UpdateDate = c.UpdateDate,
                             UpdateUserId = c.UpdateUserId
                         });
            return query;
        }
        public override ActionResult SaveItem([FromBody] CustomerModel model)
        {
            return Execute(() =>
            {
                base.SaveItem(model);
                return model;
            });
        }
    }
}
