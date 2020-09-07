using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Core;

namespace WorkHour.Model
{
    public class PersonelModel : BaseIdCreateEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mission { get; set; }
        public string Phone { get; set; }
        public string Adress { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<int?> Roles { get; set; }
    }
}
