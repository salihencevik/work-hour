using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Core
{
    public interface IsDeletedEntity
    {
        bool? Deleted { get; set; }
    }
}
