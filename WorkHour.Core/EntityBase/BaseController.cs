using Microsoft.AspNetCore.Mvc;
using System;

namespace WorkHour.Core
{
    public class BaseController: Controller
    {
        protected ActionResult Execute(Action action)
        {
            
            try
            {
                action();
                return Json(new WorkHourResponse(ResponseType.Success));
            }
            catch (Exception exp)
            {
                return Json(new WorkHourResponse(ResponseType.Error, exp.Message));
            }
            
        }

        protected ActionResult Execute<T>(Func<T> func)
        {
            try
            {
                T t = func();

                return Json(new WorkHourResponse<T>(t, ResponseType.Success));
            }
            catch (Exception exp)
            {
                return Json(new WorkHourResponse(ResponseType.Error, exp.Message));
            }
        }
    }
}
