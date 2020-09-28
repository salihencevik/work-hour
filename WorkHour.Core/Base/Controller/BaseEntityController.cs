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
        [WorkHourFilter]
        public virtual ActionResult Delete([FromBody] int id)
        {
            return Execute(() =>
            {
                var item = _Unit.GetRepository<TEntity>().Get(f => f.Id == id);
                if (item is IsDeletedEntity)
                {
                    BaseCreateUpdateReflections<TEntity>.DeletedEntity(ref item);
                   var result = _Unit.GetRepository<TEntity>().Update(item);
                    if (!result.IsSucceeded)
                    {
                        throw new Exception(result.Exception.Message);
                    }
                }
                else
                {
                    var result = _Unit.GetRepository<TEntity>().Delete(id);
                    if (!result.IsSucceeded)
                    {
                        throw new Exception(result.Exception.Message);
                    }
                }
            });
        }

        protected virtual TModel GetModel(int id)
        {
            var query = GetQuery();
            var pageQuery = new PageQuery();
            pageQuery.Parameters = new List<QueryParameter>();
            pageQuery.Parameters.Add(new QueryParameter()
            {
                ColumnName = "Id",
                ConditionType = ConditionType.Equal,
                Value = id.ToString()
            });
            var source = query.PagedList(pageQuery);
            var item = source.Items.FirstOrDefault(f => f.Id == id);
            return item;
        }



        [HttpPost]
        [Route("saveItem")]
        public virtual ActionResult SaveItem([FromBody] TModel model)
        {

            return Execute(() =>
            {
                if (model.Id == 0)
                {
                    BaseCreateUpdateReflections<TModel>.CreateEntity(ref model);
                    _Unit.GetRepository<TEntity>().Add(model.GetPropertyValues<TEntity>());
                }
                else
                {
                    BaseCreateUpdateReflections<TModel>.UpdateEntity(ref model);
                    _Unit.GetRepository<TEntity>().Update(model.GetPropertyValues<TEntity>());
                }
            });
        } 

        protected abstract IQueryable<TSearchModel> GetSearchQuery();
        protected abstract IQueryable<TModel> GetQuery();
    }
}
