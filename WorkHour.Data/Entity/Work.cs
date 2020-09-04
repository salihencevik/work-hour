﻿using System;
using System.Collections.Generic;

namespace WorkHour.Data.Entity
{
    public partial class Work
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? FinishTime { get; set; }
        public string Area { get; set; }
        public int? PersonelId { get; set; }
        public bool? Deleted { get; set; }
        public bool? Workconfirmation { get; set; }
        public string Explanation { get; set; }

        public Personel Personel { get; set; }
    }
}