using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Core;

namespace WorkHour.Model
{
    public class RoleModel : BaseIdCreateEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
