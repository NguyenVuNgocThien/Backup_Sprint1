using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IAssetRepository
    {
        public Task<AssetPagingViewModel> GetListAsset(int page,User userLogin,string filterByState,string filterByCategory,string searchString,string sort,string sortBy);
        public Task<List<AssetHistoryModel>> GetListHistoryOfAsset(string assetCode);
        Task<AssetPagingModel> GetAssetsAsync(SearchParameters parameters);
        Task<AssetPagingModel> GetAvailableAssetsAsync(SearchParameters parameters);
    }
}

