using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Claim
    {
        public Claim()
        {
            RoleClaim = new HashSet<RoleClaim>();
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public int ClaimGroupId { get; set; }

        public ClaimGroup ClaimGroup { get; set; }
        public ICollection<RoleClaim> RoleClaim { get; set; }
    }
}
