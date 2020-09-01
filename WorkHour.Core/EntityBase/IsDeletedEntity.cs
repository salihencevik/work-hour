using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkHour.Core
{
    public interface IsDeletedEntity
    {
        bool IsDeleted { get; set; }
    }
}
