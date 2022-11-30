using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IAssetRepository
    {
        public Task<AssetPagingModel> GetListAsset(int page,User userLogin,string filterByState,string filterByCategory,string searchString,string sort,string sortBy);
    }
}
