using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Core
{
    public static class BaseCreateUpdateReflections<TEntity>
    {
        public static void UpdateEntity(ref TEntity TEntity)
        {
            if (TEntity is IBaseIdUpdateEntity)
            {
                var model = TEntity as IBaseIdUpdateEntity;
                model.UpdateDate = DateTime.Now;
                model.UpdateUserId = SessionManager.LoginModel.Id;
            }
            if (TEntity is IsDeletedEntity)
            {
                var model1 = TEntity as IsDeletedEntity;
                model1.IsDeleted = false;
            } 
        }
        public static void CreateEntity(ref TEntity TEntity)
        {
            if (TEntity is IBaseIdCreateEntity)
            {
                var model = TEntity as IBaseIdCreateEntity;
                model.CreateDate = DateTime.Now;
                model.CreateUserId = SessionManager.LoginModel.Id;
            } 
            if (TEntity is IsDeletedEntity)
            {
                var model1 = TEntity as IsDeletedEntity;
                      model1.IsDeleted = false;
            }  
        }
        public static void DeletedEntity(ref TEntity TEntity)
        {
            if (TEntity is IsDeletedEntity)
            {
                var model1 = TEntity as IsDeletedEntity;
                model1.IsDeleted = true;
            }
            if (TEntity is IBaseIdUpdateEntity)
            {
                var model = TEntity as IBaseIdUpdateEntity;
                model.UpdateDate = DateTime.Now;
                model.UpdateUserId = SessionManager.LoginModel.Id;
            } 
        }

    }
}
