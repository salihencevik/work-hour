using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Model
{
    public class ShiftModel : BaseIdModel, IsDeletedEntity
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public string StartTime { get; set; }
        public DateTime FinishDate { get; set; }
        public string FinishTime { get; set; }
        public int Area { get; set; }
        public int UserId { get; set; }
        public bool IsDeleted { get; set; }
        public bool WorkConfirmation { get; set; }
        public string Explanation { get; set; }
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
