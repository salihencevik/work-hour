using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WorkHour.Core;
using WorkHour.Core.Abstract;
using WorkHour.Core.Helper;
using WorkHour.Data;
using WorkHour.Model;

namespace WorkHour.WEB.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [ApiController]
    public class UserController : BaseEntityController<User, UserModel, UserModel, IUnitofWork>
    {
        public UserController(IUnitofWork unit) : base(unit)
        {
        }

        protected override IEnumerable<UserModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<User>().GetAll().Where(f => f.IsDeleted == false)
                         select new UserModel()
                         {
                             Adress = r.Adress,
                             Email = r.Email,
                             Mission = r.Mission,
                             Name = r.Name,
                             Surname = r.Surname,
                             Id = r.Id,
                             Phone = r.Phone,
                             CreateUserId = r.CreateUserId,
                             CreateDate = r.CreateDate,
                             UpdateUserId = r.UpdateUserId,
                             UpdateDate = r.UpdateDate
                         }).ToList();
            return query;
        }
        public override ActionResult GetItem(int id)
        {
            return Execute(() =>
            {
                var userResult = _Unit.GetRepository<User>().Get(f => f.Id == id);
                var userModel = userResult.GetPropertyValues<UserModel>();
                userModel.Roles = _Unit.GetRepository<UserRole>().GetAll(t => t.UserId == id).Select(t => t.RoleId).ToList();
                userModel.Password = string.Empty;
                return userModel;
            });
        }

        protected override IEnumerable<UserModel> GetQuery()
        {
            var query = (from r in _Unit.GetRepository<User>().GetAll().Where(f => f.IsDeleted == false)
                         select new UserModel()
                         {
                             Adress = r.Adress,
                             Email = r.Email,
                             Mission = r.Mission,
                             Name = r.Name,
                             Surname = r.Surname,
                             Id = r.Id,
                             Phone = r.Phone,
                             CreateUserId = r.CreateUserId,
                             CreateDate = r.CreateDate,
                             UpdateUserId = r.UpdateUserId,
                             UpdateDate = r.UpdateDate
                         }).ToList();
            return query;
        }

        public override ActionResult SaveItem(UserModel model)
        {
            return Execute(() =>
            {
                DbOperationResult result = null;
                using (var transaction = _Unit.Context.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id == 0)
                        {

                            var item = model.GetPropertyValues<User>();
                            item.IsDeleted = false;
                            item.Password = Encrypt.EncryptSHA1(item.Password);
                            item.CreateUserId = SessionManager.LoginModel.Id;
                            item.CreateDate = DateTime.Now;
                            bool query = CheckUserName(item);
                            if (!query)
                            {
                                result = _Unit.GetRepository<User>().Add(item);

                                if (result.IsSucceeded)
                                {
                                    foreach (var roles in model.Roles)
                                    {
                                        UserRole ur = new UserRole();
                                        ur.UserId = item.Id;
                                        ur.RoleId = roles;
                                        _Unit.GetRepository<UserRole>().Add(ur);
                                    }
                                }
                                else
                                {
                                    transaction.Rollback();
                                }

                            }
                            else
                            {
                                throw new Exception("Bu isim daha önce kullanılmış");
                            }

                        }
                        else
                        {

                            var oldItem = _Unit.GetRepository<User>().Get(f => f.Id == model.Id);
                            if (String.IsNullOrEmpty(model.Password))
                            {
                                model.Password = oldItem.Password;

                            }
                            else
                            {
                                model.Password = Encrypt.EncryptSHA1(model.Password);
                            }
                            model.GetPropertyValues<User>(ref oldItem);
                            oldItem.IsDeleted = false;
                            bool query = CheckUserName(oldItem);
                            if (!query)
                            {
                                result = _Unit.GetRepository<User>().Update(oldItem);
                                if (result.IsSucceeded)
                                {
                                    var oldRole = _Unit.GetRepository<UserRole>().GetAll(f => f.UserId == model.Id);
                                    foreach (var old in oldRole)
                                    {
                                        _Unit.GetRepository<UserRole>().Delete(old.Id);
                                    }
                                    foreach (var roles in model.Roles)
                                    {
                                        UserRole ur = new UserRole();
                                        ur.UserId = oldItem.Id;
                                        ur.RoleId = roles;
                                        _Unit.GetRepository<UserRole>().Add(ur);
                                    }
                                }
                                else
                                {
                                    transaction.Rollback();
                                }

                            }

                        }
                        transaction.Commit();
                    }
                    catch (System.Exception)
                    {
                        transaction.Rollback();
                        new Exception();

                    }
                    return model;
                }
            });
        }


        private bool CheckUserName(User item)
        {
            return _Unit.GetRepository<User>().GetAll(f => f.Name == item.Name && f.Id != item.Id).Any();
        }
    }
}
