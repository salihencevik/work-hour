using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Model;

namespace WorkHour.Core
{
    public static class SessionManager
    {
        private static LoginModel _loginModel { get; set; }

        public static LoginModel LoginModel
        {
            get
            {
                return _loginModel;
            }
            set
            {
                _loginModel =  value;
            }
        }

    }
}
