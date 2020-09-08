using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public interface IBaseIdCreateEntity
    {
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
