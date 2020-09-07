using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using WorkHour.Model;

namespace WorkHour.Core
{
    public class SessionManager
    {
        static IServiceProvider services = null;
        public static IServiceProvider Services
        {
            get { return services; }
            set
            {
                if (services != null)
                {
                    throw new Exception("Can't set once a value has already been set.");
                }
                services = value;
            }
        }
        public static HttpContext Currents
        {
            get
            {
                IHttpContextAccessor httpContextAccessor = services.GetService(typeof(IHttpContextAccessor)) as IHttpContextAccessor;
                return httpContextAccessor?.HttpContext;
            }
        }
        static SessionManager _Current = null;

        public static SessionManager Current
        {
            get
            {
                if (_Current == null)
                    _Current = new SessionManager();
                return _Current;
            }
        }
        public static PersonelModel CurrentUser
        {
            get
            {
                return SessionManager.Current.Get<PersonelModel>(SessionKey.CurrentUser);
            }
        }
        public void Set(string key, object value)
        {
            var v = JsonConvert.SerializeObject(value);

            Currents.Session.SetString(key, v);
        }
        public T Get<T>(string key) where T : class, new()
        {
            var v = Currents.Session.GetString(key);
            if (v != null)
            {
                return JsonConvert.DeserializeObject<T>(v);
            }
            return null;
        }
    }
    public static class SessionKey
    {
        public const string CurrentUser = "_CurrentUser";
    }
}

