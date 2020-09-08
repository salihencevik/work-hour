using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Customer: BaseIdCreateUpdateEntity, IsDeletedEntity
    {
        public Customer()
        {
            BusinessList = new HashSet<BusinessList>();
            ProjectDescription = new HashSet<ProjectDescription>();
        }

        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Phone { get; set; }
        public string Adress { get; set; }
        public string Email { get; set; }

        public ICollection<BusinessList> BusinessList { get; set; }
        public ICollection<ProjectDescription> ProjectDescription { get; set; }
        public bool IsDeleted { get; set; }
    }
}
