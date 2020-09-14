using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Model.Customer
{
    public class CustomerModel : BaseIdModel, IsDeletedEntity, IBaseIdCreateEntity, IBaseIdUpdateEntity
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
