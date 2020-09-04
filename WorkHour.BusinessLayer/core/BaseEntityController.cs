using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkHour.BusinessLayer.Concrete;
using WorkHour.Core;
using WorkHour.Data.Entity;

namespace WorkHour.BusinessLayer.core
{
    public abstract class BaseEntityController<TEntity, TModel, TContext, TService> : BaseController
        where TEntity : BaseIdEntity, new()
        where TModel : BaseIdModel, new()
        where TContext : WorkHourContext
        where TService : EfGenericRepository<TEntity>
    {

        public abstract void Get<Tmodel>();

        protected TService Service;
        public BaseEntityController(TService service): base()
        {
            Service = service;
        }



        [HttpPost("Delete")]
        [Route("/Personel/Delete")]
        public virtual ActionResult Delete([FromBody] int id)
        {
            return Execute(() =>
            {
                

            });
        }


    }
}
