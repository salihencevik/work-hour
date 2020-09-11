using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Activity : BaseIdCreateUpdateEntity,IsDeletedEntity
    { 
        public int? UserId { get; set; }
        public string Explanation { get; set; }  
        public string Status { get; set; } 
        public int? BusinessListId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public TimeSpan? Time { get; set; }
        public DateTime? EndDate { get; set; }
        public int TotalTime { get; set; }

    }
}
