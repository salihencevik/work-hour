using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class BusinessList
    {
        public BusinessList()
        {
            Activity = new HashSet<Activity>();
        }

        public int Id { get; set; } 
        public string BusinessName { get; set; }
        public int IsApprove { get; set; } 
        public DateTime? Time { get; set; }
        public string Status { get; set; }
        public string Explanation { get; set; }
        public string TaskExplanation { get; set; } 
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string CreatorPersonel { get; set; }
        public DateTime? CreationDate { get; set; }
        public int? PersonelId { get; set; }
        public bool? IsDeleted { get; set; }
        public int? CustomerId { get; set; }
        public int? ProjectDescriptionId { get; set; }
        public string BusinessPriority { get; set; }
        public int StatusId { get; set; }
        public DateTime? LastDateStudied { get; set; }

        public Customer Customer { get; set; }
        public Personel Personel { get; set; }
        public ProjectDescription ProjectDescription { get; set; }
        public ICollection<Activity> Activity { get; set; }
    }
}
