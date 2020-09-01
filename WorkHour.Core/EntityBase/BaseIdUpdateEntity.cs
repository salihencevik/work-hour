using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkHour.Core
{
    public abstract class BaseIdUpdateEntity
    {
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }

    }
}
