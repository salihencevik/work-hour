using System;
using System.Collections.Generic;

namespace WorkHour.Data.Entity
{
    public partial class Menu
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public int? ParentId { get; set; }
        public string Url { get; set; }
        public string icon { get; set; }
        public string Datatarget { get; set; }
        public string MenuId { get; set; }
    }
}
