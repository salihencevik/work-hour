using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Shift : BaseIdCreateUpdateEntity,IsDeletedEntity
    {
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }  
        public int Area { get; set; }
        public int UserId { get; set; }
        public bool IsDeleted { get; set; }
        public bool WorkConfirmation { get; set; }
        public string Explanation { get; set; }
    }
}
