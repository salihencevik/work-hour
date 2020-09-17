using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Core.Helper
{
    public class WorkHourDataSource<T>
    {
        public List<T> Items { get; set; }

        public int Count { get; set; }

        public List<GridTotalItem> TotalItems { get; set; }
    }
}
