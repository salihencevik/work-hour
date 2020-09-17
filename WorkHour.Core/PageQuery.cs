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

        public string GridTotalItem { get; set; }
    }

    public class GridTotalItemRequest
    {
        public string ColumnName { get; set; }
        public bool Min { get; set; }
        public bool Max { get; set; }
        public bool Sum { get; set; }
        public bool Average { get; set; }
        public bool Count { get; set; }
    }

    public class GridTotalItemResponse
    {
        public string ColumnName { get; set; }
        public decimal? Min { get; set; }
        public decimal? Max { get; set; }
        public decimal? Sum { get; set; }
        public decimal? Average { get; set; }
        public int? Count { get; set; }
    }
    public class GridTotalItem
    {
        public GridTotalItem()
        {

        }
        public GridTotalItem(object sum, object average, int count)
        {
            Sum = sum;
            Average = average;
            Count = count;
        }
        public string ColumnName { get; set; }
        public string ResourceName { get; set; }
        public object Min { get; set; }
        public object Max { get; set; }
        public object Sum { get; set; }
        public object Average { get; set; }
        public int Count { get; set; }
    }
}
