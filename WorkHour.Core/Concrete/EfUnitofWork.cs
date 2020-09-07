using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Core.Abstract;
using WorkHour.Data;

namespace WorkHour.Core.Concrete
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

        public void Dispose()
        {

            _context.Dispose();
        }

        public IGenericRepository<T> GetRepository<T>() where T : class
        {
            return new EfGenericRepository<T>(_context);
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
