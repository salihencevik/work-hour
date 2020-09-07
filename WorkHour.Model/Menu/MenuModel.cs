using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Core;

namespace WorkHour.Model
{
    public class MenuModel : BaseIdCreateEntity
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public int? ParentId { get; set; }
        public string Url { get; set; }
        public string icon { get; set; }
        public string Datatarget { get; set; }
        public string MenuId { get; set; }
    }
}
