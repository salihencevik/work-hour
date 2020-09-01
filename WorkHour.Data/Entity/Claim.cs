using System;
using System.Collections.Generic; 

namespace WorkHour.Data.Entity
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
        public ICollection<RoleClaim> RoleClaim { get; set; }
    }
}
