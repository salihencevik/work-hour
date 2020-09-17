using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using WorkHour.Core.Helper;

namespace WorkHour.Core
{
    public static class Extensions
    {


        public static T GetPropertyValues<T>(this object selfmodel) where T : class
        {
            var obj = (T)Activator.CreateInstance(typeof(T));


            Type targetmodeltype = obj.GetType();
            Type selfmodeltype = selfmodel.GetType();

            PropertyInfo[] targetprops = targetmodeltype.GetProperties();
            PropertyInfo[] selfprops = selfmodeltype.GetProperties();

            foreach (var targetitem in targetprops)
            {
                foreach (var selfitem in selfprops)
                {
                    if (selfitem.Name == targetitem.Name)
                    {
                        var deneme2 = selfitem.GetValue(selfmodel, null);

                        targetitem.SetValue(obj, deneme2);
                    }

                }
            }

            return obj;
        }
        public static void  GetPropertyValues<T>(this object selfmodel,ref T Targetmodel)where T : class
        {
      
            Type targetmodeltype = Targetmodel.GetType();
            Type selfmodeltype = selfmodel.GetType();

            PropertyInfo[] targetprops = targetmodeltype.GetProperties();
            PropertyInfo[] selfprops = selfmodeltype.GetProperties();

            foreach (var targetitem in targetprops)
            {
                foreach (var selfitem in selfprops)
                {
                    if (selfitem.Name == targetitem.Name)
                    {
                        var deneme2 = selfitem.GetValue(selfmodel, null);

                        targetitem.SetValue(Targetmodel, deneme2);
                    }

                }
            }

        }
        public static WorkHourDataSource<T> PagedList<T>(this IQueryable<T> items,PageQuery query)
        {
            WorkHourDataSource<T> source = new WorkHourDataSource<T>();

            source.Count = items.Count();

            int page = query.pageNumber + 1;

            if (query.pageSize > 0)
            {
                source.Items = items.Skip((page - 1) * query.pageSize).Take(query.pageSize).ToList();
            }
            else
            {
                source.Items = items.ToList();
            }
            return source;
        }
    }
}
