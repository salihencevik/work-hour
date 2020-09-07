using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Core.Abstract
{
    public interface IUnitofWork : IDisposable
    {

        WorkHourContext Context { get; }
        IGenericRepository<T> GetRepository<T>() where T : class;
   

        int SaveChanges();
    }
}
