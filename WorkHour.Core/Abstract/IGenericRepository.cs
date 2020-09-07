using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace WorkHour.Core.Abstract
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Get(Expression<Func<TEntity, bool>> filter);
        IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null);
        DbOperationResult Add(TEntity entity);
        DbOperationResult Update(TEntity entity);
        DbOperationResult Delete(int id);
        void SaveChanges();
    }
}
