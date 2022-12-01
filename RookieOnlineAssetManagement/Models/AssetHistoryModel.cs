using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models.Assignment;
using System;
using System.Collections.Generic;

namespace RookieOnlineAssetManagement.Models
{
    public class AssetHistoryModel
    {
        public DateTime InstalledDate { get; set; }
        public List<AssignmentHistoryDTO> AssignmentHistory { get; set; } 
        public List<ReturningRequestHistoryModel> ReturningRequestHistory { get; set; }
    }
}
