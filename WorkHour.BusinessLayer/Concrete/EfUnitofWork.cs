//using SQLitePCL;
using System; 
using WorkHour.DataAccess.DataAccess.Abstract;
using WorkHour.Data.Entity;
using WorkHour.BusinessLayer.Concrete;

namespace WorkHour.DataAccess.DataAccess.Concrete.EntityFramework
{
    public class EfUnitofWork : IUnitofWork
    {
        public WorkHourContext _context;
        public EfUnitofWork(WorkHourContext context)
        {
            _context = context ?? throw new ArgumentNullException("dbcontext can not be null");
        }
        public WorkHourContext Context
        {
            get
            {
                return _context;
            }
        }
        private IGenericRepository<Claim> _claim;
        private IGenericRepository<ClaimGroup> _claimGroup;
        private IGenericRepository<BusinessList> _businessList;
        private IGenericRepository<Activity> _activity;
        private IGenericRepository<Customer> _customer;
        private IGenericRepository<Personel> _personel;
        private IGenericRepository<ProjectDescription> _projectDescription;
        private IGenericRepository<RoleClaim> _roleClaim;
        private IGenericRepository<Role> _role;
        private IGenericRepository<UserRole> _userRole;
        private IGenericRepository<Work> _work; 
        private IGenericRepository<Menu> _menus; 

        public IGenericRepository<Claim> Claims
        {
            get
            {
                return _claim ?? (_claim = new EfGenericRepository<Claim>(_context));
            }
        } 

        public IGenericRepository<Activity> Activities
        {
            get
            {
                return _activity ?? (_activity = new EfGenericRepository<Activity>(_context));
            }
        }

        public IGenericRepository<UserRole> UserRoles
        {
            get
            {
                return _userRole ?? (_userRole = new EfGenericRepository<UserRole>(_context));
            }
        }


        public IGenericRepository<RoleClaim> RoleClaims
        {
            get
            {
                return _roleClaim ?? (_roleClaim = new EfGenericRepository<RoleClaim>(_context));
            }
        }


        public IGenericRepository<Role> Roles
        {
            get
            {
                return _role ?? (_role = new EfGenericRepository<Role>(_context));
            }
        }


        public IGenericRepository<Work> Works
        {
            get
            {
                return _work ?? (_work = new EfGenericRepository<Work>(_context));
            }
        }


        public IGenericRepository<Customer> Customers
        {
            get
            {
                return _customer ?? (_customer = new EfGenericRepository<Customer>(_context));
            }
        } 


        public IGenericRepository<Personel> Personels
        {
            get
            {
                return _personel ?? (_personel = new EfGenericRepository<Personel>(_context));
            }
        }


        public IGenericRepository<BusinessList> Business
        {
            get
            {
                return _businessList ?? (_businessList = new EfGenericRepository<BusinessList>(_context));
            }
        }


        public IGenericRepository<ProjectDescription> ProjectDescriptions
        {
            get
            {
                return _projectDescription ?? (_projectDescription = new EfGenericRepository<ProjectDescription>(_context));
            }
        }


        public IGenericRepository<Menu> Menus
        {
            get
            {
                return _menus ?? (_menus = new EfGenericRepository<Menu>(_context));
            }
        }

        public IGenericRepository<ClaimGroup> ClaimGroup
        {
            get
            {
                return _claimGroup ?? (_claimGroup = new EfGenericRepository<ClaimGroup>(_context));
            }
        }

        public void Dispose()
        {

            _context.Dispose();
        }

        public int SaveChanges()
        {

            try
            {
                return _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
