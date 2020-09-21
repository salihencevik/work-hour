using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Model
{
    public class RoleModel : BaseIdModel,IsDeletedEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
