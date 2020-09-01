using System;
using System.Collections.Generic;

namespace WorkHour.Data.Entity
{
    public  class UserRole
    {
        public int Id { get; set; }
        public int? PersonelId { get; set; }
        public int? RoleId { get; set; }
    }
}
