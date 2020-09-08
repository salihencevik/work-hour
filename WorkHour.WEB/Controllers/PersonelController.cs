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
    public class PersonelController : BaseEntityController<Personel, PersonelModel, PersonelModel, IUnitofWork>
    {
        public PersonelController(IUnitofWork unit) : base(unit)
        {
        } 

        protected override IEnumerable<PersonelModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<Personel>().GetAll().Where(f => f.Deleted == false)
                         select new PersonelModel()
                         {
                             Adress = r.Adress,
                             Email = r.Email,
                             Mission = r.Mission,
                             Name = r.Name,
                             Id = r.Id,
                             Phone = r.Phone
                         }).ToList();
            return query;
        }
        public override ActionResult GetItem(int id)
        {
            return Execute(() =>
            {
                var userResult = _Unit.GetRepository<Personel>().Get(f => f.Id == id);
                var userModel = userResult.GetPropertyValues<PersonelModel>();
                userModel.Roles = _Unit.GetRepository<UserRole>().GetAll(t => t.PersonelId == id).Select(t => t.RoleId).ToList();
                userModel.Password = string.Empty; 
                return userModel;
            });
        }

        protected override IEnumerable<PersonelModel> GetQuery()
        {
            var query = (from r in _Unit.GetRepository<Personel>().GetAll().Where(f => f.Deleted == false)
                         select new PersonelModel()
                         {
                             Adress = r.Adress,
                             Email = r.Email,
                             Mission = r.Mission,
                             Name = r.Name,
                             Id = r.Id,
                             Phone = r.Phone
                         }).ToList();
            return query;
        } 

        public override ActionResult SaveItem(PersonelModel model)
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

                            var item  = model.GetPropertyValues<Personel>();
                            item.Deleted = false;
                            item.Password = Encrypt.EncryptSHA1(item.Password);
                            bool query = CheckUserName(item);
                            if (!query)
                            {
                              result =  _Unit.GetRepository<Personel>().Add(item);

                                if (result.IsSucceeded)
                                {
                                    foreach (var roles in model.Roles)
                                    {
                                        UserRole ur = new UserRole();
                                        ur.PersonelId = item.Id;
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
                            
                            var oldItem  = _Unit.GetRepository<Personel>().Get(f => f.Id == model.Id); 
                            if (String.IsNullOrEmpty(model.Password))
                            {
                                model.Password = oldItem.Password;
                                
                            }
                            else
                            {
                                model.Password = Encrypt.EncryptSHA1(model.Password);
                            } 
                            var item = model.GetPropertyValues<Personel>();
                            item.Deleted = false; 
                            bool query = CheckUserName(item);
                            if (!query)
                            {
                                result = _Unit.GetRepository<Personel>().Update(item); 
                                if (result.IsSucceeded)
                                {
                                    var oldRole = _Unit.GetRepository<UserRole>().GetAll(f => f.PersonelId == model.Id);
                                    foreach (var old in oldRole)
                                    {
                                        _Unit.GetRepository<UserRole>().Delete(old.Id);
                                    }
                                    foreach (var roles in model.Roles)
                                    {
                                        UserRole ur = new UserRole();
                                        ur.PersonelId = item.Id;
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


        private bool CheckUserName(Personel item)
        {
           return _Unit.GetRepository<Personel>().GetAll(f => f.Name == item.Name && f.Id != item.Id).Any();  
        }
    }
}
