using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System.Collections;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IAssetRepository _assetRepository;
        public AssetsController(UserManager<User> userManager, IAssetRepository assetRepository)
        {
            _userManager = userManager;
            _assetRepository = assetRepository;
        }
        [HttpGet("{page}/{filterByState}/{filterByCategory}/{searchString}/{sort}/{sortBy}")]
        public async Task<ActionResult<AssetPagingModel>> GetListAsset(int page,string filterByState, string filterByCategory, string searchString, string sort, string sortBy)
        {
            var userLogin = await _userManager.GetUserAsync(User);
            var listAsset = await _assetRepository.GetListAsset( page ,userLogin,filterByState, filterByCategory, searchString, sort, sortBy);
            return Ok(listAsset);
        }
    }
}
