using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Repositories
{
    public class CategoryRepository:ICategoryRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public CategoryRepository(IMapper mapper, ApplicationDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<CategoryModel>> GetListCategory()
        {
            var categoryList = await _context.Categories.Select(x => new CategoryModel
            {
                Id = x.Id,
                CategoryName = x.Name
            }).ToListAsync();
            return _mapper.Map<List<CategoryModel>>(categoryList);
        }
    }
}
