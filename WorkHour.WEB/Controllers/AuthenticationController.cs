using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkHour.Core;
using WorkHour.Core.Abstract;
using WorkHour.Core.Helper;
using WorkHour.Data;
using WorkHour.Model;

namespace WorkHour.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class AuthenticationController : ControllerBase
    {
        internal readonly IUnitofWork _unit;
        public AuthenticationController(IUnitofWork unit)
        {
            _unit = unit;
        }
        [HttpGet] 
        [Route("Login/{username}/{password}")]
        public IActionResult Login(string username,string password)
        {
            password = Encrypt.EncryptSHA1(password);
            var item = _unit.GetRepository<Personel>().Get(i => i.UserName == username && i.Password == password && i.IsDeleted == false);
            if (item != null)
            {
                var role = _unit.GetRepository<UserRole>().Get(i => i.PersonelId == item.Id);
                var roleClaim = _unit.GetRepository<RoleClaim>().GetAll().Where(i => i.RoleId == role.RoleId);
                var claim = _unit.GetRepository<Claim>().GetAll().ToList();
                var menu = _unit.GetRepository<Menu>().GetAll();

               
                var ClaimText = new List<string>();
                var menuItem = new List<Menu>();

                foreach (var items in roleClaim)
                {
                    var q = claim.FirstOrDefault(b => b.Id == items.ClaimId).Text;
                    ClaimText.Add(q);
                }

                foreach (var m in menu)
                {
                    if (ClaimText.Contains(m.Status))
                    {
                        menuItem.Add(m);
                    }
                }

                string baseToken = string.Format("Personel.{0}", item.Id); 
                var token = Encrypt.GetMD5Hash(baseToken);

                var query = new LoginModel()
                {
                    Name = item.Name,
                    UserName = item.UserName,
                    Id = item.Id,
                    ClaimText = ClaimText,
                    LoginResponseType = LoginResponseTypes.Success,
                    MenuItem = menuItem,
                    Token = token
                };

                SessionManager.LoginModel = query;

                return Ok(query);
            }
            else
            {
                var query = new LoginModel()
                { 
                    LoginResponseType = LoginResponseTypes.ErrorPasswordOrUsername
                };
                return Ok(query);
            }
        }
    }
}
