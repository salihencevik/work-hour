using System;
using System.Collections.Generic;
using System.Text;

namespace WorkHour.Model.User
{
    public class UserProfilePanelModel
    {
        public int TotalWorkCount { get; set; }
        public int CompletedTotalWorkCount { get; set; }
        public int DoingTotalWorkCount { get; set; }
        public int WaitingTotalWorkCount { get; set; }
    }
}
