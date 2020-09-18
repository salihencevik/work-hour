using System;
using WorkHour.Data;

namespace WorkHour.Model.Project
{
    public class ProjectModel : BaseIdModel, IsDeletedEntity, IBaseIdCreateEntity, IBaseIdUpdateEntity
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public string Name { get; set; }
        public int? CustomerId { get; set; }
        public int CreateUserId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdateUserId { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
