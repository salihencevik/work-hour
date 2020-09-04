using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WorkHour.DataAccess.DataAccess.Abstract;
using WorkHour.Data.Entity;
using WorkHour.Core;
using Microsoft.EntityFrameworkCore;
//using WorkHour.Models;

namespace WorkHour.BusinessLayer.Concrete
{
    public class EfGenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private WorkHourContext _context;
        private DbSet<TEntity> _dbset;

        public EfGenericRepository(WorkHourContext context)
        {
            _context = context;
            _dbset = _context.Set<TEntity>();
        }
        private TEntity GetEntityById(int id)
        {

            var item = _dbset.Find(id);

            return item;

        }

        public DbOperationResult Add(TEntity entity)
        {
            return Execute(() =>
            {
                _dbset.Add(entity);
                SaveChanges();
            });
        }

        public DbOperationResult Delete(int id)
        {

            return Execute(() =>
            {
                var entity = GetEntityById(id);
                if (entity is IsDeletedEntity)
                {
                    ((IsDeletedEntity)entity).Deleted = true;
                    Update(entity);
                }
                else
                {
                    _dbset.Remove(entity);
                }


                SaveChanges();
            }
            );

        }

        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {
            return _dbset.SingleOrDefault(filter);
        }

        public IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null)
        {
            return filter == null
                 ? _context.Set<TEntity>()
                 : _context.Set<TEntity>().Where(filter);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public DbOperationResult Update(TEntity entity)
        {
            return Execute(() =>
            {
                _dbset.Update(entity);
                SaveChanges();
            });

        }
        public DbOperationResult Execute(Action action)
        {
            try
            {
                action.Invoke();
                return new DbOperationResult();
            }
            catch (Exception ex)
            {
                return new DbOperationResult(ex);

            }

        }
    }
}
