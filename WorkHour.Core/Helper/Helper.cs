﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WorkHour.Core.Helper
{
    public static class Helper
    {
        /// <summary>
        /// verilen claimtext'in yetkisi olup olmadığını kontrol ediyoruz
        /// </summary>
        /// <param name="_claimText"></param>
        /// <returns></returns>
        public static bool AuthorityControl(string _claimText)
        {
            if (SessionManager.LoginModel != null)
            {
                foreach (var item in SessionManager.LoginModel.ClaimText)
                {
                    if (item.Equals(_claimText))
                    {
                        return true;
                    }
                }

            }
            return false;
        }
        /// <summary>
        /// Controller'ın hangi claim'i kullanacağını getirmektedir. örnek Get veya update 
        /// </summary>
        /// <returns></returns>
        public static string ControllerGetClaimtext(string Controllername)
        {
            IEnumerable<string> values = Enum.GetValues(typeof(CRUDClaimEnum))
                              .OfType<CRUDClaimEnum>()
                              .Select(s => s.ToString());
            foreach (var value in values)
            {
                if (Controllername.Contains(value))
                {
                    return value.ToString();
                }
            }
            return string.Empty;
        }

        enum CRUDClaimEnum
        {
            GetItems,
            Show,
            Delete,
            Insert,
            Update,
            ExportToExcel

        }



    }
}
