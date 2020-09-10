using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Model
{
    public class PersonelModel : BaseIdModel, IsDeletedEntity
    {
        public int Id { get; set; }
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
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
