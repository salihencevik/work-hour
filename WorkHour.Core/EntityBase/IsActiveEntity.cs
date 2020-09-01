using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkHour.Core
{
    public interface IsActiveEntity
    {
         bool IsActive { get; set; }
    }
}
