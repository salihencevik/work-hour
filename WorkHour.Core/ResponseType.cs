using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkHour.Core
{
    public enum ResponseType : short
    {
        Success = 1,
        Logon = 2,
        Error = 3,
        Authorization = 4
    }
}
