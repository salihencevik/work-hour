using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

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
        public static T GetPropertyValues<T>(this object selfmodel,T Targetmodel) where T : class
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

            return Targetmodel;
        }

    }
}
