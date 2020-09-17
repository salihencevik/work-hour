using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection; 
using System;
using WorkHour.Core;

namespace RakamCrm.Web.Core
{
    public class RakamAuthorizationFilterAttribute : ActionFilterAttribute
    {
        private const string ContextParameterUserIdName = "Auth_UserId";
        private const string ContextParameterTokenName = "Auth_token";

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!IsAuthenticate(context))
            {
                context.Result = new JsonResult(new  WorkHourResponse(ResponseType.Logon, "Invalid logon credentials"));
            }
        }

        protected virtual bool IsAuthenticate(ActionExecutingContext context)
        {
            if (context == null || context.HttpContext == null || context.HttpContext.Request == null)
            {
                return true;
            }

            bool valid = false;

            if (context.HttpContext.Request.Headers.ContainsKey(ContextParameterUserIdName) && context.HttpContext.Request.Headers.ContainsKey(ContextParameterTokenName))
            {
                var userId = Convert.ToInt32(context.HttpContext.Request.Headers[ContextParameterUserIdName]);
                string token = context.HttpContext.Request.Headers[ContextParameterTokenName].ToString();

                var provider = context.HttpContext.RequestServices; 
            }

            return valid;
        }
    }
}
