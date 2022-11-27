using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IAssetRepository
    {
        public Task<List<AssetModel>> GetAllAsync(User userLogin);
    }
}
