using System;
using System.Collections.Generic;

namespace WorkHour.Data.Entity
{
    public partial class ProjectDescription
    {

        public ProjectDescription()
        {
            BusinessList = new HashSet<BusinessList>();
        }

        public int Id { get; set; }
        public string ProjectName { get; set; }
        public int? CustomerId { get; set; }
        public bool? Deleted { get; set; }

        public Customer Customer { get; set; }
        public ICollection<BusinessList> BusinessList { get; set; }
    }
}
