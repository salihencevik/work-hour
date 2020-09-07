using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace WorkHour.Core
{
    public static class Extensions
    {


        public static T CreateFrom<T>(this object item) where T : class, new()
        {
            T t = new T();
            item.FillObject(t);
            return t;
        }

        public static object CreateFrom(this object item, Type destinationType)
        {
            var newItem = Activator.CreateInstance(destinationType);
            item.FillObject(newItem);
            return newItem;
        }
        public static void FillObject(this object from, object to, bool ignoreCase = false)
        {

        }



        public static T GetPropertyValues<T>(this object selfmodel, T targetmodel)
        {

            Type targetmodeltype = targetmodel.GetType();
            Type selfmodeltype = selfmodel.GetType();

            PropertyInfo[] targetprops = targetmodeltype.GetProperties();
            PropertyInfo[] selfprops = selfmodeltype.GetProperties();

            foreach (var targetitem in targetprops)
            {
                foreach (var selfitem in selfprops)
                {
                    if (selfitem.Name == targetitem.Name)
                    {
                        var deneme = targetitem.GetValue(targetmodel, null);

                        var deneme2 = selfitem.GetValue(selfmodel, null);

                        targetitem.SetValue(targetmodel, deneme2);
                    }

                }
            }

            return targetmodel;
        }

    }
}
