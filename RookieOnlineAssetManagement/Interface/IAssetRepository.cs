using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IAssetRepository
    {
        public Task<List<AssetModel>> GetListAsset(User userLogin,string filterByState,string filterByCategory,string searchString,string sort,string sortBy);
    }
}
