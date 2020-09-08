using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public interface IBaseIdUpdateEntity
    {
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
