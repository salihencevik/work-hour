using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public abstract class BaseIdCreateEntity : BaseIdEntity, IBaseIdCreateEntity
    {
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }
        public int Id { get; set; }
    }
}
