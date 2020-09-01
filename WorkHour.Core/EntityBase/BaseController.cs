using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using WorkHour.Core;

namespace WorkHour.BusinessLayer.Core
{
    public abstract class BaseController<TEntity, TModel, TSearchModel, TExportModel, TService, TContext> : Controller
        where TEntity : BaseIdEntity, new()
        where TModel : BaseIdEntity, new()
        where TExportModel : BaseIdEntity, new()
    {
         
    }
}
