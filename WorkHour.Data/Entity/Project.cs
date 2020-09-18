using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Project  : BaseIdCreateUpdateEntity, IsDeletedEntity
    { 
        public string Name { get; set; }
        public int? CustomerId { get; set; }
        public bool IsDeleted { get; set; }
    }

}
