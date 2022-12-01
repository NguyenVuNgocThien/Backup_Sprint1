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
        var assignments = _context.Assignments.Include(a => a.Asset).Where(a => a.AssignedBy == userLogin.Id && a.IsDisabled == false);
        var assetList = _context.Assets.Where(x => x.Location == userLogin.Location).Select(x => new AssetModel
        {
            AssetCode = x.AssetCode,
            AssetName = x.AssetName,
            State = x.State,
            InstalledDate = x.InstalledDate,
            Spectification = x.Specification,
            Location = userLogin.Location,
            Category = x.Category.Name
        }).OrderBy(x => x.AssetCode);
        List<string> strings = new List<string>();
        foreach(var asset in assetList)
        {
            if (assignments.FirstOrDefault(x => x.Asset.AssetCode == asset.AssetCode)!=null)
            {
                if (asset.State == AssetState.Assigned)
                {
                    strings.Add(asset.AssetCode);
                }
            }
            else
            {
                strings.Add(asset.AssetCode);
            }
        }
        assetList = assetList.Where(x => strings.Contains(x.AssetCode)).OrderBy(x => x.AssetCode);
        if (filterByCategory != "null")
        {
            string[] listCategory = filterByCategory.Trim().Split(' ');
            foreach (var category in listCategory)
            {
                if (category == "All")
                {
                    assetList=assetList.Where(x=>x.Category!="All").OrderBy(x=>x.AssetCode);
                    break;
                }

                assetList=assetList.Where(on => listCategory.Contains(on.Category)).OrderBy(x=>x.AssetCode);
            }
        }
        if (searchString != "null")
        {
            assetList= assetList.Where(x =>
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
                    assetList=assetList.Where(x=>x.State==AssetState.Assigned||
                    x.State == AssetState.Available|| x.State == AssetState.NotAvailable||
                    x.State == AssetState.WaitingForRecycling|| x.State == AssetState.Recycled).OrderBy(x=>x.AssetCode);
                    break;
                }
                AssetState newState = (AssetState)System.Enum.Parse(typeof(AssetState), state);
                states.Add(newState);
            }
            if (filterByState.Contains("All") == false)
            {
                assetList = assetList.Where(x => states.Contains(x.State)).OrderBy(x => x.AssetCode);
            }
        }
        if (sortBy == "Ascending")
            switch (sort)
            {
                case "Asset Code":
                    assetList= assetList.OrderBy(x => x.AssetCode);
                    break;
                case "Asset Name":
                    assetList = assetList.OrderBy(x => x.AssetName);
                    break;
                case "Category":
                    assetList = assetList.OrderBy(x => x.Category);
                    break;
                case "State":
                    assetList = assetList.OrderBy(x => x.State);
                    break;
            }
        else
        {
            switch (sort)
            {
                case "Asset Code":
                    assetList = assetList.OrderByDescending(x => x.AssetCode);
                    break;
                case "Asset Name":
                    assetList = assetList.OrderByDescending(x => x.AssetName);
                    break;
                case "Category":
                    assetList = assetList.OrderByDescending(x => x.Category);
                    break;
                case "State":
                    assetList = assetList.OrderByDescending(x => x.State);
                    break;
            }
        }
        int limit = 10;
        var count = assetList.Count();
        if (page > 0) page--;
        if (count < limit)
        {
            page = 0;
            limit = count;
        }
        var ret = await assetList.Skip(page * limit).Take(limit).ToListAsync();
        return new AssetPagingViewModel
        {
            AssetTotal = count,
            AssetList = ret,

        };
    }

    public async Task<List<AssetHistoryModel>> GetListHistoryOfAsset(string assetCode)
    {
        var assignments = _context.Assignments.Include(a => a.Asset).Where(a => a.Asset.AssetCode == assetCode).Select(a => new AssignmentHistoryDTO
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
            AssignmentHistory = assignments.ToList()
        });
        return await assets.ToListAsync();
    }
}