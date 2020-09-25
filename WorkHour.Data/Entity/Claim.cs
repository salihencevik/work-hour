using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Claim:BaseIdEntity
    { 
        public string Text { get; set; }
        public int ClaimGroupId { get; set; } 
    }
}
