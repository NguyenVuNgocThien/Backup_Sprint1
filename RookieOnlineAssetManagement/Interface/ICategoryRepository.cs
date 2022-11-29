using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface ICategoryRepository
    {
        public  Task<List<CategoryModel>> GetListCategory();
    }
}
