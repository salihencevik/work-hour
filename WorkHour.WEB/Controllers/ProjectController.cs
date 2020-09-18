using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkHour.Core;
using WorkHour.Core.Abstract;
using WorkHour.Data;
using WorkHour.Model.Project;

namespace WorkHour.WEB.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class ProjectController : BaseEntityController<Project, ProjectModel, ProjectModel, IUnitofWork>
    {
        public ProjectController(IUnitofWork unit) : base(unit)
        {
        }

        protected override IQueryable<ProjectModel> GetQuery()
        {
            var project = _Unit.GetRepository<Project>().GetAll();
            var query = (from p in project
                         select new ProjectModel
                         {
                             Id = p.Id,
                             CreateDate = p.CreateDate,
                             CreateUserId = p.CreateUserId,
                             IsDeleted = p.IsDeleted,
                             Name = p.Name,
                             UpdateDate = p.UpdateDate,
                             UpdateUserId = p.UpdateUserId,
                             CustomerId = p.CustomerId
                         });
            return query;

        }

        protected override IQueryable<ProjectModel> GetSearchQuery()
        {
            var project = _Unit.GetRepository<Project>().GetAll();
            var query = (from p in project
                         select new ProjectModel
                         {
                             Id = p.Id,
                             CreateDate = p.CreateDate,
                             CreateUserId = p.CreateUserId,
                             IsDeleted = p.IsDeleted,
                             Name = p.Name,
                             UpdateDate = p.UpdateDate,
                             UpdateUserId = p.UpdateUserId,
                             CustomerId = p.CustomerId
                         });
            return query;
        }

        public override ActionResult SaveItem([FromBody] ProjectModel model)
        {
            return Execute(() =>
            {
                base.SaveItem(model);
                return model;
            });
        }
    }
}
