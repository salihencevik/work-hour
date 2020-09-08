using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Data
{
    public class BaseIdCreateUpdateEntity : BaseIdCreateEntity, IBaseIdUpdateEntity
    {
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
