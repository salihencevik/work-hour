using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class User : BaseIdCreateUpdateEntity, IsDeletedEntity
    { 
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Mission { get; set; }
        public string Phone { get; set; }
        public string Adress { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsDeleted { get; set; } 
    }
}
