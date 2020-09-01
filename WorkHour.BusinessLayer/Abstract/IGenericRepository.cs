using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WorkHour.DataAccess.DataAccess.Abstract
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Get(Expression<Func<TEntity, bool>> filter);
        IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null);
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void SaveChanges();
    }
}
