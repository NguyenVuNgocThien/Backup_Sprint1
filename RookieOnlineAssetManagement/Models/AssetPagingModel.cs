using System.Collections.Generic;

namespace RookieOnlineAssetManagement.Models
{
    public class AssetPagingModel
    {
        public int AssetTotal { get; set; }
        public List<AssetModel> AssetList { get; set; }
    }
}
