using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WorkHour.BusinessLayer.Concrete;
using WorkHour.Core;
using WorkHour.Data.Entity;
using WorkHour.DataAccess.DataAccess.Abstract;

namespace WorkHour.core
{
    public abstract class BaseEntityController<TEntity, TModel, TSearchModel, TContext> : BaseController
        where TEntity : BaseIdEntity, new()
        where TModel : BaseIdModel, new()
        where TSearchModel : BaseIdModel, new()
        //where TService : EfGenericRepository<TEntity>
    {
        protected IUnitofWork _Unit;
        public BaseEntityController(IUnitofWork unit) : base()
        {
            _Unit = unit;
        }

        [HttpGet("GetItems")]
        public virtual ActionResult GetItems(string parameters)
        {
            return Execute(() =>
            {
                return GetSearchQuery();
            });

        }



        [HttpPost("Delete")]
        public virtual ActionResult Delete([FromBody] int id)
        {
            return Execute(() =>
            {
                var result = _Unit.GetRepository<TEntity>().Delete(id);

                if (!result.IsSucceeded)
                {
                    throw new Exception(result.Message);
                }


            });
        }

        [HttpPost]
        [Route("saveItem")]
        public virtual ActionResult SaveItem(TModel model)
        {
            return Execute(() =>
            {
                if (model.Id == 0)
                {

                }
                else
                {

                }
            });
        }


        protected abstract IEnumerable<TSearchModel> GetSearchQuery();
    }
}
