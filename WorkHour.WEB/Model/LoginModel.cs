using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkHour.BusinessLayer;
using WorkHour.Core;
using WorkHour.Data.Entity;

namespace WorkHour.WEB.Model
{
    public class LoginModel : BaseIdEntity
    { 
        public string Name { get; set; } 
        public List<string> ClaimText { get; set; }
        public string UserName { get; set; }
        public LoginResponseTypes LoginResponseType { get; set; }
        public List<Menu> MenuItem { get; set; }
        public string Token { get; set; }
    }
    public enum LoginResponseTypes
    {
        Success = 1,
        ErrorPasswordOrUsername = 2,
        ChangePasswordFirstLogin = 3,
    }
}
