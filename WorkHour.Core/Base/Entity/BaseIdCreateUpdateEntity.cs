﻿using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Core
{
    public class BaseIdCreateUpdateEntity : BaseIdCreateEntity
    {
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
