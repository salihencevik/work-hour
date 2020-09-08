using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public interface IsDeletedEntity
    {
        bool IsDeleted { get; set; }
    }
}
