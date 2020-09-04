using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkHour.Core
{
    public abstract class BaseIdCreateEntity : BaseIdModel
    {
        public int CreateUserId { get; set; } 
        public DateTime CreateDate { get; set; }
        public int Id { get; set; }
    }
}
