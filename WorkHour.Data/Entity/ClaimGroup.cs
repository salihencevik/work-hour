using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public class ClaimGroup
    {
        public ClaimGroup()
        {
            Claim = new HashSet<Claim>();
        }
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public ICollection<Claim> Claim { get; set; }
    }
}
