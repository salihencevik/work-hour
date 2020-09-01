using System;
using System.Collections.Generic;

namespace WorkHour.Data.Entity
{
    public partial class RoleClaim
    {
        public int Id { get; set; }
        public int? ClaimId { get; set; }
        public int? RoleId { get; set; }
    }
}
