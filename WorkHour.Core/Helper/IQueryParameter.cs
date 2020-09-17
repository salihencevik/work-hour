using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Core.Helper
{
    public interface IQueryParameter
    {
        string ColumnName { get; set; }
        string Value { get; set; }
        int Condition { get; set; } 
        bool? IsAnd { get; set; } 
        //ConditionType ConditionType
        //{
        //    get;
        //    set;
        //}
    }
}
