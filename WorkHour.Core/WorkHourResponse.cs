using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Core
{
    public class WorkHourResponse
    {
        public short ResponseType { get; set; }

        public string Message { get; set; }

        public WorkHourResponse(ResponseType response, string msg = "")
        {
            ResponseType = (short)response;
            Message = msg;
        }

        public virtual object GetItem()
        {
            return null;
        }
    }

    public class WorkHourResponse<T> : WorkHourResponse
    {
        public WorkHourResponse(T t, ResponseType response, string msg = "") : base(response, msg)
        {
            Item = t;
        }

        public T Item { get; set; }

        public override object GetItem()
        {
            return Item;
        }
    }
}
