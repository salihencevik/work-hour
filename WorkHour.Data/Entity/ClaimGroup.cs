using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public class ClaimGroup : BaseIdEntity
    { 
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
