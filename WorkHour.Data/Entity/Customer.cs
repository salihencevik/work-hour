using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Customer: BaseIdCreateUpdateEntity, IsDeletedEntity
    {

        public string CustomerName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
    }
}
