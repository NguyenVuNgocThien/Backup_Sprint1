using System;

namespace RookieOnlineAssetManagement.Models
{
    public class CreateAssignmentModel
    {
        public string StaffCode { get; set; }
        public string AssetCode { get; set; }
        public DateTime AssignedDate { get; set; }
        public string Note { get; set; }
    }
}