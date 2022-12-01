using System;
using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Enum;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Entities;
using Microsoft.AspNetCore.Identity;
using NuGet.ContentModel;
using RookieOnlineAssetManagement.Models.Assignment;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RookieOnlineAssetManagement.Repositories;
public class AssetRepository : IAssetRepository
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

    public async Task<AssetPagingModel> GetAssetsAsync(SearchParameters parameters)
    {
        var assetCount = _context.Assets.Count();
        var assets = await _context.Assets
            .Include(_ => _.Category)
            .OrderBy(on => on.AssetCode)
            .Skip((parameters.PageNumber - 1) * parameters.PageSize)
            .Take(parameters.PageSize)
            .ToListAsync();

        var assetList = _mapper.Map<List<AssetDTO>>(assets);

        return new AssetPagingModel
        {
            Total = assetCount,
            Assets = assetList,
        };
    }

    public async Task<AssetPagingModel> GetAvailableAssetsAsync(SearchParameters parameters)
    {
        var searchString = (parameters.SearchString == null) ? "" : parameters.SearchString;
        var assetQuery = _context.Assets
            .Include(_ => _.Category)
            .Where(x => x.State == AssetState.Available &&
                (x.AssetCode.Contains(searchString) || x.AssetName.Contains(searchString))
            );
        var assetCount = assetQuery.Count();
        if (parameters.SortType)
        {
            switch (parameters.SortBy)
            {
                case "AssetName":
                    assetQuery = assetQuery.OrderBy(on => (on.AssetName).ToLower());
                    break;
                case "Category":
                    assetQuery = assetQuery.OrderBy(on => on.Category.Name);
                    break;
                default:
                    assetQuery = assetQuery.OrderBy(on => on.AssetCode);
                    break;
            }
        }
        else
        {
            switch (parameters.SortBy)
            {
                case "AssetName":
                    assetQuery = assetQuery.OrderByDescending(on => (on.AssetName).ToLower());
                    break;
                case "Category":
                    assetQuery = assetQuery.OrderByDescending(on => on.Category.Name);
                    break;
                default:
                    assetQuery = assetQuery.OrderByDescending(on => on.AssetCode);
                    break;
            }
        }
        var assets = await assetQuery
            .Skip((parameters.PageNumber - 1) * parameters.PageSize)
            .Take(parameters.PageSize)
            .ToListAsync();

        var assetList = _mapper.Map<List<AssetDTO>>(assets);

        return new AssetPagingModel
        {
            Total = assetCount,
            Assets = assetList,
        };
    }
    public async Task<AssetPagingViewModel> GetListAsset(int page,User userLogin, string filterByState, string filterByCategory, string searchString, string sort, string sortBy)
    {
        var assignmentQuery = _context.Assignments.Include(a => a.Asset).Where(a => a.AssignedBy == userLogin.Id && a.IsDisabled == false);
        var assetQuery = _context.Assets.Where(x => x.Location == userLogin.Location).Select(x => new AssetModel
        {
            AssetCode = x.AssetCode,
            AssetName = x.AssetName,
            State = x.State,
            InstalledDate = x.InstalledDate,
            Spectification = x.Specification,
            Location = userLogin.Location,
            Category = x.Category.Name
        }).OrderBy(x => x.AssetCode);
        if (assignmentQuery != null)
        {
            List<string> assetCodes = new List<string>();
            foreach (var asset in assetQuery)
            {
                if (assignmentQuery.FirstOrDefault(x => x.Asset.AssetCode == asset.AssetCode) != null)
                {
                    if (asset.State == AssetState.Assigned)
                    {
                        assetCodes.Add(asset.AssetCode);
                    }
                }
                else
                {
                    assetCodes.Add(asset.AssetCode);
                }
            }
            assetQuery = assetQuery.Where(x => assetCodes.Contains(x.AssetCode)).OrderBy(x => x.AssetCode);
        }
        if (filterByCategory != "null")
        {
            string[] listCategory = filterByCategory.Trim().Split(' ');
            foreach (var category in listCategory)
            {
                if (category == "All")
                {
                    assetQuery=assetQuery.Where(x=>x.Category!="All").OrderBy(x=>x.AssetCode);
                    break;
                }

                assetQuery=assetQuery.Where(on => listCategory.Contains(on.Category.Replace(" ",""))).OrderBy(x=>x.AssetCode);
            }
        }
        if (searchString != "null")
        {
            assetQuery= assetQuery.Where(x =>
            (x.AssetCode.Replace(" ", "")
            .ToUpper()
            .Contains(searchString.Replace(" ", "").ToUpper())) ||
            (x.AssetName.Replace(" ", "")
            .ToUpper()
            .Contains(searchString.Replace(" ", "").ToUpper()))).OrderBy(x=>x.AssetCode);
        }
        if (filterByState != "null")
        {
            List<AssetState> states = new List<AssetState>();
            string[] listState = filterByState.Trim().Split(' ');
            foreach (var state in listState)
            {
                if (state == "All")
                {
                    assetQuery=assetQuery.Where(x=>x.State==AssetState.Assigned||
                    x.State == AssetState.Available|| x.State == AssetState.NotAvailable||
                    x.State == AssetState.WaitingForRecycling|| x.State == AssetState.Recycled).OrderBy(x=>x.AssetCode);
                    break;
                }
                AssetState newState = (AssetState)System.Enum.Parse(typeof(AssetState), state);
                states.Add(newState);
            }
            if (filterByState.Contains("All") == false)
            {
                assetQuery = assetQuery.Where(x => states.Contains(x.State)).OrderBy(x => x.AssetCode);
            }
        }
        if (sortBy == "Ascending")
            switch (sort)
            {
                case "Asset Code":
                    assetQuery= assetQuery.OrderBy(x => x.AssetCode);
                    break;
                case "Asset Name":
                    assetQuery = assetQuery.OrderBy(x => x.AssetName);
                    break;
                case "Category":
                    assetQuery = assetQuery.OrderBy(x => x.Category);
                    break;
                case "State":
                    assetQuery = assetQuery.OrderBy(x => x.State);
                    break;
            }
        else
        {
            switch (sort)
            {
                case "Asset Code":
                    assetQuery = assetQuery.OrderByDescending(x => x.AssetCode);
                    break;
                case "Asset Name":
                    assetQuery = assetQuery.OrderByDescending(x => x.AssetName);
                    break;
                case "Category":
                    assetQuery = assetQuery.OrderByDescending(x => x.Category);
                    break;
                case "State":
                    assetQuery = assetQuery.OrderByDescending(x => x.State);
                    break;
            }
        }
        int limit = 10;
        var assetTotal = assetQuery.Count();
        if (page > 0)
        {
            page--;
        };
        if (assetTotal < limit)
        {
            page = 0;
            limit = assetTotal;
        }
        var assetList = await assetQuery.Skip(page * limit).Take(limit).ToListAsync();
        return new AssetPagingViewModel
        {
            AssetTotal = assetTotal,
            AssetList = assetList,

        };
    }

    public async Task<List<AssetHistoryModel>> GetListHistoryOfAsset(string assetCode)
    {
        var assignmentQuery = _context.Assignments.Include(a => a.Asset).Where(a => a.Asset.AssetCode == assetCode).Select(a => new AssignmentHistoryDTO
        {
            AssignedBy = a.AssignedByUser.UserName,
            AssignedTo = a.AssignedToUser.UserName
        });
        var returningRequests = _context.ReturningRequests.Include(r => r.Asset).Where(r => r.Asset.AssetCode == assetCode).Select(r=>new ReturningRequestHistoryModel
        {
            ReturnedDate=r.ReturnedDate
        });
        var assets = _context.Assets.Where(a => a.AssetCode == assetCode).Select(a => new AssetHistoryModel
        {
            InstalledDate = a.InstalledDate,
            ReturningRequestHistory = returningRequests.ToList(),
            AssignmentHistory = assignmentQuery.ToList()
        });
        return await assets.ToListAsync();
    }
}