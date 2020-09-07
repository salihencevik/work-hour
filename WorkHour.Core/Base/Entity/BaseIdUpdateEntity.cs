using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Core
{
    public abstract class BaseIdUpdateEntity
    {
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }

    }
}
