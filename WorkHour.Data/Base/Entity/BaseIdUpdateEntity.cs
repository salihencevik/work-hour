using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public abstract class BaseIdUpdateEntity: IBaseIdUpdateEntity
    {
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }

    }
}
