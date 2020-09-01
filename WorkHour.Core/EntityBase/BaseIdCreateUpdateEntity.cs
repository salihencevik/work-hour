using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkHour.Core
{
    public class BaseIdCreateUpdateEntity : BaseIdCreateEntity
    {
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
