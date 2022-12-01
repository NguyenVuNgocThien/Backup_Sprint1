using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Models;
using Microsoft.AspNetCore.Authorization;
using RookieOnlineAssetManagement.Interface;
using Microsoft.AspNetCore.Identity;
using RookieOnlineAssetManagement.Entities;

namespace RookieOnlineAssetManagement.Controllers;

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

    [HttpGet("[action]")]
    public async Task<ActionResult<AssetPagingModel>> GetAssets([FromQuery] SearchParameters parameters)
    {
        var result = await _assetRepository.GetAssetsAsync(parameters);
        return Ok(result);
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<AssetPagingModel>> GetAvailableAssets([FromQuery] SearchParameters parameters)
    {
        var result = await _assetRepository.GetAvailableAssetsAsync(parameters);
        return Ok(result);
    }
    [HttpGet("{page}/{filterByState}/{filterByCategory}/{searchString}/{sort}/{sortBy}")]
    public async Task<ActionResult<AssetPagingViewModel>> GetListAsset(int page,string filterByState, string filterByCategory, string searchString, string sort, string sortBy)
    {
        var userLogin = await _userManager.GetUserAsync(User);
        var listAsset = await _assetRepository.GetListAsset(page,userLogin, filterByState, filterByCategory, searchString, sort, sortBy);
        return Ok(listAsset);
    }
    [HttpGet("{assetCode}")]
    public async Task<ActionResult<AssetHistoryModel>> GetHistory(string assetCode)
    {
        var assets = await _assetRepository.GetListHistoryOfAsset(assetCode);
        return Ok(assets);
    }
}