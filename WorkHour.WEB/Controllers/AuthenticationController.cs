using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkHour.BusinessLayer.Helper;
using WorkHour.Data.Entity;
using WorkHour.DataAccess.DataAccess.Abstract;
using WorkHour.WEB.Model;

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
            var item = _unit.Personels.Get(i => i.UserName == username && i.Password == password && i.Deleted == false);
            if (item != null)
            {
                var role = _unit.UserRoles.Get(i => i.PersonelId == item.Id);
                var roleClaim = _unit.RoleClaims.GetAll().Where(i => i.RoleId == role.RoleId);
                var claim = _unit.Claims.GetAll().ToList();
                var menu = _unit.Menus.GetAll();

               
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
