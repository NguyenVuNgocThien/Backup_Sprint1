using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICategoryRepository _categoryRepository;
        public CategoriesController(UserManager<User> userManager, ICategoryRepository categoryRepository)
        {
            _userManager = userManager;
            _categoryRepository = categoryRepository;
        }
        [HttpGet]
        public async Task<ActionResult<CategoryModel>> GetListCategory()
        {
            var list =await _categoryRepository.GetListCategory();
            return Ok(list);
        }
    }
}
