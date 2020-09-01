using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkHour.Data.Entity
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
