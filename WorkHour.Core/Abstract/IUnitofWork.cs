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
        IGenericRepository<T> GetRepository<T>() where T : class;
        int SaveChanges();
    }
}
