using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;


namespace WorkHour.Core.Filter
{
    [Authorize]
    public class WorkHourFilter : ActionFilterAttribute
    {
        private readonly string _claimText;
        public string ActionName { get; set; }
        public string ClaimText { get; set; }
        public WorkHourFilter()
        {
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context == null)
            {
                context.Result = new JsonResult(new WorkHourResponse(ResponseType.Logon, "Invalid logon credentials"));
            }

            if (context == null || context.HttpContext == null || context.HttpContext.Request == null)
            {
                return;
            }

            try
            {
                string claimText = ClaimText;
                var descriptor = context.ActionDescriptor as ControllerActionDescriptor;
                
                if (!Helper.Helper.AuthorityControl(descriptor.ControllerName +"."+ Helper.Helper.ControllerGetClaimtext(descriptor.ActionName)))
                {
                    context.Result = new JsonResult(new WorkHourResponse(ResponseType.Authorization, $"Access denied --> {claimText}"));
                }
                

            }
            catch (Exception exp)
            {
                context.Result = new JsonResult(new WorkHourResponse(ResponseType.Logon, exp.Message));
            }
        }



    }
}
