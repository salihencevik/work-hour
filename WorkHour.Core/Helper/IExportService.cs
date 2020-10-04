using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Core.Helper
{
 public interface IExportService
    {
        byte[] ExportToXlsx<T>(IEnumerable<T> data, string tableName = null) where T:class ;

        byte[] ExportToXlsx(IEnumerable<Dictionary<string, object>> items, List<string> columns, string tableName = null);

        byte[] PrintToPdf<T>(IEnumerable<T> data) where T : class;

    }
}
