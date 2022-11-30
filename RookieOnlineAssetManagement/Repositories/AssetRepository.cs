using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Enum;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Repositories
{
    public class AssetRepository:IAssetRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public AssetRepository(IMapper mapper, ApplicationDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<AssetModel>> GetListAsset(User userLogin, string filterByState, string filterByCategory, string searchString, string sort, string sortBy)
        {
            var assignments = await _context.Assignments.Include(a=>a.Asset).Where(a => a.AssignedBy == userLogin.Id&&a.IsDisabled==false).ToListAsync();
            var assets = await _context.Assets.Where(x => x.Location == userLogin.Location).Select(x=>new AssetModel
            {
                AssetCode=x.AssetCode,
                AssetName=x.AssetName,
                State=x.State,
                InstalledDate=x.InstalledDate,
                Spectification=x.Specification,
                Location=userLogin.Location,
                Category=x.Category.Name
            }).OrderBy(x => x.AssetCode).ToListAsync();
            List<AssetModel> assetList = new List<AssetModel>();
            foreach(var asset in assets)
            {
                if (assignments.FirstOrDefault(a => a.Asset.AssetCode == asset.AssetCode) != null)
                {
                    if (asset.State == AssetState.Assigned)
                    {
                        assetList.Add(asset);
                    }
                }
                else
                {
                    if (asset.State == AssetState.Available || asset.State == AssetState.NotAvailable)
                    {
                        assetList.Add(asset);
                    }
                }

            }
            if (searchString != "null")
            {
                assetList = assetList.Where(x => 
                (x.AssetCode.Replace(" ", "")
                .ToUpper()
                .Contains(searchString.Replace(" ", "").ToUpper()))||
                (x.AssetName.Replace(" ", "")
                .ToUpper()
                .Contains(searchString.Replace(" ", "").ToUpper()))).ToList();
            }
            if (filterByCategory != "null")
            {
                string[] listCategory = filterByCategory.Trim().Split(' ');
                List<AssetModel> listAssetFilterByCategory = new List<AssetModel>();
                foreach(var category in listCategory)
                {
                    if(category=="All")
                    {
                        listAssetFilterByCategory.AddRange(assetList.ToList());
                        break;
                    }
                    listAssetFilterByCategory.AddRange(assetList.Where(x => x.Category.Replace(" ","") == category).ToList());
                }
                assetList = listAssetFilterByCategory;
            }
            if (filterByState != "null")
            {
                string[] listState = filterByState.Trim().Split(' ');
                List<AssetModel> listAssetFilterByState = new List<AssetModel>();
                foreach (var state in listState)
                {
                    if (state == "All")
                    {
                        listAssetFilterByState.AddRange(assetList.ToList());
                        break;
                    }
                    listAssetFilterByState.AddRange(assetList.Where(x => x.State.ToString() == state).ToList());
                }
                assetList = listAssetFilterByState;
            }
            if(sortBy=="Ascending")
                switch (sort)
                {
                        case "Asset Code":
                            assetList = assetList.OrderBy(x => x.AssetCode).ToList();
                            break;
                        case "Asset Name":
                            assetList = assetList.OrderBy(x => x.AssetCode).ToList();
                            break;
                        case "Category":
                            assetList = assetList.OrderBy(x => x.Category).ToList();
                            break;
                        case "State":
                            assetList = assetList.OrderBy(x => x.State).ToList();
                            break;
                }
            else
            {
                switch (sort)
                {
                    case "Asset Code":
                        assetList = assetList.OrderByDescending(x => x.AssetCode).ToList();
                        break;
                    case "Asset Name":
                        assetList = assetList.OrderByDescending(x => x.AssetCode).ToList();
                        break;
                    case "Category":
                        assetList = assetList.OrderByDescending(x => x.Category).ToList();
                        break;
                    case "State":
                        assetList = assetList.OrderByDescending(x => x.State).ToList();
                        break;
                }
            }
            return assetList;
        }
    }
}
