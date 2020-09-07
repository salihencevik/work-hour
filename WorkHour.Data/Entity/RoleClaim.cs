using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class RoleClaim
    {
        public int Id { get; set; }
        public int? ClaimId { get; set; }
        public int? RoleId { get; set; }

        public Claim Claim { get; set; }
        public Role Role { get; set; }
    }
}
