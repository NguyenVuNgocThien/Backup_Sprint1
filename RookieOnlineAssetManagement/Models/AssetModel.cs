using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Enum;

namespace RookieOnlineAssetManagement.Models
{
    public class AssetModel
    {
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string Category { get; set; }
        public AssetState AssetState { get; set; }

    }
}
