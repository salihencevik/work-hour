using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class Work
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }
        public string Area { get; set; }
        public int? UserId { get; set; }
        public bool IsDeleted { get; set; }
        public bool? Workconfirmation { get; set; }
        public string Explanation { get; set; }

    }
}
