using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Core
{
    public class PageQuery
    {
        public string orderColumn { get; set; }

        public string orderDir { get; set; }

        public short pageNumber { get; set; }

        public short pageSize { get; set; }
        public List<QueryParameter> Parameters { get; set; }

    }
     
}
