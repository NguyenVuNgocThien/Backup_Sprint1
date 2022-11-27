using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Repositories
{
    public class AssetRepository : IAssetRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        public AssetRepository(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public Task<List<AssetModel>> GetAllAsync(User userLogin)
        {
            var test = from x in _context.Users
                       from a in _context.Assignments
                       where x.StaffCode == a.AssignedBy
                       where a.AssignedTo == "SD0001"
                       select new UserModel
                       {
                           Id = x.Id,
                           StaffCode = x.StaffCode,
                           FullName = x.FirstName + " " + x.LastName,
                           UserName = x.UserName,
                           JoinedDate = x.JoinedDate,
                           DateofBirth = x.DateofBirth,
                           Gender = x.Gender,
                           Location = x.Location,
                           Type = x.Type,
                           isDisabled = x.IsDisabled
                       };
            throw new System.NotImplementedException();
        }
    }
}
