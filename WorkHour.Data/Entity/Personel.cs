using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WorkHour.Core;

namespace WorkHour.Data.Entity
{
    public partial class Personel: IsDeletedEntity
    {
        public Personel()
        {
            Activity = new HashSet<Activity>();
            BusinessList = new HashSet<BusinessList>();
            UserRole = new HashSet<UserRole>();
            Work = new HashSet<Work>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mission { get; set; }
        public string Phone { get; set; }
        public string Adress { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool? Deleted { get; set; }

        public ICollection<Activity> Activity { get; set; }
        public ICollection<BusinessList> BusinessList { get; set; }
        public ICollection<UserRole> UserRole { get; set; }
        public ICollection<Work> Work { get; set; }
    }
}
