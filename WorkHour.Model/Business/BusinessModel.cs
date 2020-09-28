using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Model
{
    public class BusinessModel : BaseIdModel, IsDeletedEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? Time { get; set; }
        public int Status { get; set; }
        public string Explanation { get; set; }
        public string TaskExplanation { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Priority { get; set; }
        public DateTime? LastDateStudied { get; set; }
        public int IsApprove { get; set; }
        public int? UserId { get; set; }
        public string CustomerName { get; set; }
        public string ProjectName { get; set; }
        public bool IsDeleted { get; set; }
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }

    }
}
