using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Activity:BaseIdCreateUpdateEntity , IsDeletedEntity
    {
        public int Id { get; set; }
        public string CreateUser { get; set; }
        public int? PersonelId { get; set; }
        public string Expanation { get; set; }
        public int? UpdateUser { get; set; }
        public string Status { get; set; }
        public int? BusinessListId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public TimeSpan? Time { get; set; }
        public DateTime? EndDate { get; set; }
        public int StatusId { get; set; }
        public int TotalTime { get; set; }
    }
}
