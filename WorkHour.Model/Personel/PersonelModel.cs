﻿using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Model
{
    public class PersonelModel : BaseIdCreateUpdateEntity, BaseIdModel, IsDeletedEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mission { get; set; }
        public string Phone { get; set; }
        public string Adress { get; set; }
        public List<string> ClaimText { get; set; }
        public bool IsDeleted { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public List<int?> Roles { get; set; }
    }
}
