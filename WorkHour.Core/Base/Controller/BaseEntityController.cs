using Microsoft.AspNetCore.Mvc;
using RakamCrm.Web.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WorkHour.Core.Abstract;
using WorkHour.Core.Filter;
using WorkHour.Core.Helper;
using WorkHour.Data;

namespace WorkHour.Core
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
        [WorkHourFilter]
        public virtual ActionResult GetItems(PageQuery pageQuery, string parameters)
        {
            return Execute(() =>
            {
                var query = GetSearchQuery();

                var source = query.PagedList(pageQuery);

                return SearchItemsLoaded(source);
            });

        }
        [HttpGet("GetItem/{id}")]
        public virtual ActionResult GetItem(int id)
        {
            return Execute(() =>
            {
                return GetModel(id);
            });

        }
        public virtual WorkHourDataSource<TSearchModel> SearchItemsLoaded(WorkHourDataSource<TSearchModel> source)
        {
            return source;
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

        protected virtual TModel GetModel(int id)
        {
            return GetQuery().FirstOrDefault(x => x.Id == id);
        }



        [HttpPost]
        [Route("saveItem")]
        public virtual ActionResult SaveItem([FromBody] TModel model)
        {
           
            return Execute(() =>
            {
                if (model.Id == 0)
                {
                    if (model is IBaseIdCreateEntity)
                    {
                        ((IBaseIdCreateEntity)model).CreateDate = DateTime.Now;
                        ((IBaseIdCreateEntity)model).CreateUserId = SessionManager.LoginModel.Id;

                    }
                    _Unit.GetRepository<TEntity>().Add(model.GetPropertyValues<TEntity>());
                }
                else
                {

                    if (model is IBaseIdUpdateEntity)
                    {
                        ((IBaseIdCreateEntity)model).CreateDate = DateTime.Now;
                        ((IBaseIdCreateEntity)model).CreateUserId = SessionManager.LoginModel.Id;
                        ((IBaseIdUpdateEntity)model).UpdateDate = DateTime.Now;
                        ((IBaseIdUpdateEntity)model).UpdateUserId = SessionManager.LoginModel.Id;
                    }
                    _Unit.GetRepository<TEntity>().Update(model.GetPropertyValues<TEntity>());
                }
            });
        }


        protected abstract IQueryable<TSearchModel> GetSearchQuery();
        protected abstract IQueryable<TModel> GetQuery();
    }
}
