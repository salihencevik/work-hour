﻿using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class BusinessList : BaseIdCreateUpdateEntity,IsDeletedEntity
    {
        public string BusinessName { get; set; }
        public DateTime? Time { get; set; }
        public string Status { get; set; }
        public string Explanation { get; set; }
        public string TaskExplanation { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string BusinessPriority { get; set; }
        public DateTime? LastDateStudied { get; set; }
        public int IsApprove { get; set; }
        public int? UserId { get; set; }
        public int? CustomerId { get; set; } 
        public int? ProjectId { get; set; }
        public bool IsDeleted { get; set; } 
    }
}
