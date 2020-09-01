using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkHour.Data.Entity;

namespace WorkHour.DataAccess.DataAccess.Abstract
{
    public interface IUnitofWork : IDisposable
    {

        WorkHourContext Context { get; } 
        IGenericRepository<Claim> Claims { get; }
        IGenericRepository<Activity> Activities { get; }
        IGenericRepository<ClaimGroup> ClaimGroup { get; }
        IGenericRepository<UserRole> UserRoles { get; }
        IGenericRepository<RoleClaim> RoleClaims { get; }
        IGenericRepository<Role> Roles { get; }
        IGenericRepository<Work> Works { get; }
        IGenericRepository<Customer> Customers { get; } 
        IGenericRepository<Personel> Personels { get; }
        IGenericRepository<BusinessList> Business { get; }
        IGenericRepository<ProjectDescription> ProjectDescriptions { get; }
        IGenericRepository<Menu> Menus { get; } 

        int SaveChanges();
    }
}
