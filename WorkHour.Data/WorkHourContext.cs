﻿using Microsoft.EntityFrameworkCore;
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
        public DbSet<Business> Business { get; set; }
        public DbSet<Claim> Claim { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<RoleClaim> RoleClaim { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Shift> Shift { get; set; }
        public DbSet<ClaimGroup> ClaimGroup { get; set; }
    }
}
