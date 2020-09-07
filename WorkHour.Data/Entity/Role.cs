using System;
using System.Collections.Generic;

namespace WorkHour.Data
{
    public partial class Role : BaseIdEntity
    {
        public Role()
        {
            RoleClaim = new HashSet<RoleClaim>();
            UserRole = new HashSet<UserRole>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<RoleClaim> RoleClaim { get; set; }
        public ICollection<UserRole> UserRole { get; set; }
    }
}
