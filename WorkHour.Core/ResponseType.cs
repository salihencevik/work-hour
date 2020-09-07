using System;
using System.Collections.Generic;
using System.Text;

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
