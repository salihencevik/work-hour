using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Data;

namespace WorkHour.Core
{
    public static class BaseCreateUpdateReflections<Tentity>
    {
        public static void UpdateEntity(ref Tentity tentity)
        {
            var model = tentity as IBaseIdUpdateEntity;
            model.UpdateDate= DateTime.Now;
            model.UpdateUserId = SessionManager.LoginModel.Id;

        }
        public static void CreateEntity(ref Tentity tentity)
        {

            var model = tentity as IBaseIdCreateEntity;
            model.CreateDate = DateTime.Now;
            model.CreateUserId = SessionManager.LoginModel.Id;
            var model1 = tentity as IsDeletedEntity;
            model1.IsDeleted = false;

        }

    }
}
