using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; 
using WorkHour.Core;
using WorkHour.Core.Abstract;
using WorkHour.Data; 
using WorkHour.Model;

namespace WorkHour.WEB.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class RoleController : BaseEntityController<Role, RoleModel, RoleModel, IUnitofWork>
    {
        public RoleController(IUnitofWork unit) : base(unit)
        {
        }
        protected override IQueryable<RoleModel> GetQuery()
        {
            var query = (from r in _Unit.GetRepository<Role>().GetAll()
                         select new RoleModel()
                         {
                             Name = r.Name,
                             Id = r.Id,
                             CreateUserId = r.CreateUserId,
                             CreateDate = r.CreateDate,
                             UpdateUserId = r.UpdateUserId,
                             UpdateDate = r.UpdateDate
                         });
            return query;
        }

        protected override IQueryable<RoleModel> GetSearchQuery()
        {
            var query = (from r in _Unit.GetRepository<Role>().GetAll()
                         select new RoleModel()
                         {
                             Name = r.Name,
                             Id = r.Id,
                             CreateUserId = r.CreateUserId,
                             CreateDate = r.CreateDate,
                             UpdateUserId = r.UpdateUserId,
                             UpdateDate = r.UpdateDate
                         });
            return query;
        }
        public override ActionResult GetItem(int id)
        {
            return Execute(() =>
            { 
                var role = _Unit.GetRepository<Role>().Get(f=>f.Id == id);
                var item = role.GetPropertyValues<RoleModel>();
                item.RoleClaim = _Unit.GetRepository<RoleClaim>().GetAll(f => f.RoleId == id).Select(c => c.ClaimId).ToList(); 
                return item;
            });
        }
        [HttpGet("GetClaims")]
        public ActionResult GetClaims()
        {
            return Execute(() =>
            { 
                var claim = _Unit.GetRepository<Claim>().GetAll().ToList();
                var claimGroup = _Unit.GetRepository<ClaimGroup>().GetAll().ToList();

                var r = new
                {
                    claimList = claim.Select(f=> new { Id = f.Id , Name = f.Text,ClaimGroupId = f.ClaimGroupId} ),
                    claimGroupList = claimGroup.Select(f=>new { Id = f.Id, Name = f.Name})
                };

                return r;
            });
        }
        public override ActionResult Delete([FromBody] int id)
        {
            return Execute(() =>
            {
                using (var transaction = _Unit.Context.Database.BeginTransaction())
                {
                    try
                    {
                        var userRole = _Unit.GetRepository<UserRole>().GetAll(f => f.RoleId == id).ToList();
                        if (userRole.Count > 0)
                           throw new Exception("Bu rol bir kullanıcı tarafından kullanıldığı için silinemez");

                        var roleClaim = _Unit.GetRepository<RoleClaim>().GetAll(f => f.RoleId == id).ToList();
                        if (roleClaim.Count > 0)
                        {
                            foreach (var item in roleClaim)
                            {
                                var controlls = _Unit.GetRepository<RoleClaim>().Delete(item.Id);
                                if (!controlls.IsSucceeded)
                                    transaction.Rollback();
                            }
                        } 
                        var controll = _Unit.GetRepository<Role>().Delete(id);
                        if(!controll.IsSucceeded)
                            transaction.Rollback();
                        transaction.Commit();

                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                } 
            }); 
        }
        public override ActionResult SaveItem([FromBody] RoleModel model)
        {
            return Execute(() =>
            {
                using (var transaction = _Unit.Context.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id == 0)
                        {
                            var item = model.GetPropertyValues<Role>();
                            BaseCreateUpdateReflections<Role>.CreateEntity(ref item);
                            var result = _Unit.GetRepository<Role>().Add(item);

                            if (result.IsSucceeded)
                            {
                                if (model.RoleClaim.Count > 0)
                                {
                                    foreach (var newClaimId in model.RoleClaim)
                                    {
                                        RoleClaim claim = new RoleClaim();
                                        claim.RoleId = item.Id;
                                        claim.ClaimId = newClaimId;
                                        var controll = _Unit.GetRepository<RoleClaim>().Add(claim);
                                        if (!controll.IsSucceeded)
                                            transaction.Rollback();
                                    }
                                   
                                }
                            }
                            else
                            {
                                transaction.Rollback();
                            }
                        }
                        else
                        {
                            var oldItem = _Unit.GetRepository<Role>().Get(f => f.Id == model.Id);
                            model.GetPropertyValues<Role>(ref oldItem);
                            BaseCreateUpdateReflections<Role>.UpdateEntity(ref oldItem);
                           var result = _Unit.GetRepository<Role>().Update(oldItem);
                            if (result.IsSucceeded)
                            {
                                var oldRoleClaim = _Unit.GetRepository<RoleClaim>().GetAll(f => f.RoleId == model.Id).ToList();
                                foreach (var old in oldRoleClaim)
                                {
                                    _Unit.GetRepository<RoleClaim>().Delete(old.Id);
                                }
                                foreach (var newClaimId in model.RoleClaim)
                                {
                                    RoleClaim claim = new RoleClaim();
                                    claim.RoleId = oldItem.Id;
                                    claim.ClaimId = newClaimId;
                                    var controll = _Unit.GetRepository<RoleClaim>().Add(claim);
                                    if (!controll.IsSucceeded)
                                        transaction.Rollback();
                                }
                            }
                            else
                            {
                                transaction.Rollback();
                            }
                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            
                return model;
            });

        }
    }
}
