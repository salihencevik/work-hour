using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WorkHour.DataAccess.DataAccess.Abstract; 
using WorkHour.Data.Entity;
using WorkHour.Core;
//using WorkHour.Models;

namespace WorkHour.BusinessLayer.Concrete
{
    public class EfGenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private WorkHourContext _context;


        private TEntity GetEntityById(int id)
        {
            return Execute(() =>
            {
                var item = _context.Set<TEntity>().Find(id);
                //var item = Repository.GetById<T>(new object[] { id });

                //if (item != null)
                //{
                    
                //    Repository.Context.DetachItem(item);
                //}

                return item;
            });
        }

        private TEntity Execute(Func<TEntity> action)
        {
            try
            {
                TEntity result = action();
                action.Invoke();
                return result;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public EfGenericRepository(WorkHourContext context)
        {
            _context = context;
        }
        public void Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = GetEntityById(id);

            if (entity is IsDeletedEntity)
            {
                ((IsDeletedEntity)entity).Deleted = true;
                //if(context.Item is IIsActiveEntity)
                //    ((IIsActiveEntity)context.Item).IsActive = false;
                Update(entity);
            }
            else
            {
                _context.Set<TEntity>().Remove(entity);
            }


            SaveChanges();

        }

        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {
            return _context.Set<TEntity>().SingleOrDefault(filter);
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

        public void Update(TEntity entity)
        {   
            _context.Set<TEntity>().Update(entity);
            SaveChanges();

        }
    }
}
