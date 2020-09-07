using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Data
{
    public partial class WorkHourContext : DbContext
    {
        public WorkHourContext(DbContextOptions<WorkHourContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activity { get; set; }
        public DbSet<BusinessList> BusinessList { get; set; }
        public DbSet<Claim> Claim { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<Personel> Personel { get; set; }
        public DbSet<ProjectDescription> ProjectDescription { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<RoleClaim> RoleClaim { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Work> Work { get; set; }
    }
}
