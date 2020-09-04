﻿using System;
using System.Collections.Generic;

namespace WorkHour.Data.Entity
{
    public partial class UserRole
    {
        public int Id { get; set; }
        public int? PersonelId { get; set; }
        public int? RoleId { get; set; }

        public Personel Personel { get; set; }
        public Role Role { get; set; }
    }
}