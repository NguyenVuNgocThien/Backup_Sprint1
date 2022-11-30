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

        public async Task<AssetPagingModel> GetListAsset(int page,User userLogin, string filterByState, string filterByCategory, string searchString, string sort, string sortBy)
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
            //foreach (var asset in assetList)
            //{
            //    if (assignments.FirstOrDefault(x => x.Asset.AssetCode == asset.AssetCode) != null)
            //    {
            //        if (asset.State == AssetState.Assigned)
            //        {
            //            strings.Add(asset.AssetCode);
            //        }
            //    }
            //    else
            //    {
            //        strings.Add(asset.AssetCode);
            //    }
            //}
            assetList = assetList.Where(x => strings.Contains(x.AssetCode)).OrderBy(x => x.AssetCode);
            if (filterByCategory != "null")
            {
                string[] listCategory = filterByCategory.Trim().Split(' ');
                foreach (var category in listCategory)
                {
                    if (category == "All")
                    {
                        assetList = assetList.Where(x => x.Category != "All").OrderBy(x => x.AssetCode);
                        break;
                    }

                    assetList = assetList.Where(on => listCategory.Contains(on.Category)).OrderBy(x => x.AssetCode);
                }
            }
            if (searchString != "null")
            {
                assetList = assetList.Where(x =>
                (x.AssetCode.Replace(" ", "")
                .ToUpper()
                .Contains(searchString.Replace(" ", "").ToUpper())) ||
                (x.AssetName.Replace(" ", "")
                .ToUpper()
                .Contains(searchString.Replace(" ", "").ToUpper()))).OrderBy(x => x.AssetCode);
            }
            if (filterByState != "null")
            {
                List<AssetState> states = new List<AssetState>();
                string[] listState = filterByState.Trim().Split(' ');
                foreach (var state in listState)
                {
                    if (state == "All")
                    {
                        assetList = assetList.Where(x => x.State == AssetState.Assigned ||
                        x.State == AssetState.Available || x.State == AssetState.NotAvailable ||
                        x.State == AssetState.WaitingForRecycling || x.State == AssetState.Recycled).OrderBy(x => x.AssetCode);
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
                        assetList = assetList.OrderBy(x => x.AssetCode);
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
            //var assignments = await _context.Assignments.Include(a=>a.Asset).Where(a => a.AssignedBy == userLogin.Id&&a.IsDisabled==false).ToListAsync();
            //var assets = await _context.Assets.Where(x => x.Location == userLogin.Location).Select(x=>new AssetModel
            //{
            //    AssetCode=x.AssetCode,
            //    AssetName=x.AssetName,
            //    State=x.State,
            //    InstalledDate=x.InstalledDate,
            //    Spectification=x.Specification,
            //    Location=userLogin.Location,
            //    Category=x.Category.Name
            //}).OrderBy(x => x.AssetCode).ToListAsync();
            //List<AssetModel> assetList = new List<AssetModel>();
            //foreach(var asset in assets)
            //{
            //    if (assignments.FirstOrDefault(a => a.Asset.AssetCode == asset.AssetCode) != null)
            //    {
            //        if (asset.State == AssetState.Assigned)
            //        {
            //            assetList.Add(asset);
            //        }
            //    }
            //    else
            //    {
            //        if (asset.State == AssetState.Available || asset.State == AssetState.NotAvailable)
            //        {
            //            assetList.Add(asset);
            //        }
            //    }

            //}
            //if (searchString != "null")
            //{
            //    assetList = assetList.Where(x => 
            //    (x.AssetCode.Replace(" ", "")
            //    .ToUpper()
            //    .Contains(searchString.Replace(" ", "").ToUpper()))||
            //    (x.AssetName.Replace(" ", "")
            //    .ToUpper()
            //    .Contains(searchString.Replace(" ", "").ToUpper()))).ToList();
            //}
            //if (filterByCategory != "null")
            //{
            //    string[] listCategory = filterByCategory.Trim().Split(' ');
            //    List<AssetModel> listAssetFilterByCategory = new List<AssetModel>();
            //    foreach(var category in listCategory)
            //    {
            //        if(category=="All")
            //        {
            //            listAssetFilterByCategory.AddRange(assetList.ToList());
            //            break;
            //        }
            //        listAssetFilterByCategory.AddRange(assetList.Where(x => x.Category.Replace(" ","") == category).ToList());
            //    }
            //    assetList = listAssetFilterByCategory;
            //}
            //if (filterByState != "null")
            //{
            //    string[] listState = filterByState.Trim().Split(' ');
            //    List<AssetModel> listAssetFilterByState = new List<AssetModel>();
            //    foreach (var state in listState)
            //    {
            //        if (state == "All")
            //        {
            //            listAssetFilterByState.AddRange(assetList.ToList());
            //            break;
            //        }
            //        listAssetFilterByState.AddRange(assetList.Where(x => x.State.ToString() == state).ToList());
            //    }
            //    assetList = listAssetFilterByState;
            //}
            //if(sortBy=="Ascending")
            //    switch (sort)
            //    {
            //            case "Asset Code":
            //                assetList = assetList.OrderBy(x => x.AssetCode).ToList();
            //                break;
            //            case "Asset Name":
            //                assetList = assetList.OrderBy(x => x.AssetCode).ToList();
            //                break;
            //            case "Category":
            //                assetList = assetList.OrderBy(x => x.Category).ToList();
            //                break;
            //            case "State":
            //                assetList = assetList.OrderBy(x => x.State).ToList();
            //                break;
            //    }
            //else
            //{
            //    switch (sort)
            //    {
            //        case "Asset Code":
            //            assetList = assetList.OrderByDescending(x => x.AssetCode).ToList();
            //            break;
            //        case "Asset Name":
            //            assetList = assetList.OrderByDescending(x => x.AssetCode).ToList();
            //            break;
            //        case "Category":
            //            assetList = assetList.OrderByDescending(x => x.Category).ToList();
            //            break;
            //        case "State":
            //            assetList = assetList.OrderByDescending(x => x.State).ToList();
            //            break;
            //    }
            //}
            var assetTotal = _context.Assets.Count();
            int limit = 10;
            var count = assetList.Count();
            if (page > 0) page--;
            if (count < limit)
            {
                page = 0;
                limit = count;
            }
            //assetList =  assetList.Skip(page * limit)
            //                      .Take(limit).ToList();
            var ret = await assetList.Skip(page * limit).Take(limit).ToListAsync();
            //assetList = await assetList.Skip(page * limit).Take(limit).ToListAsync();


            //List<Product> products = await _dbContext.Products.OrderByDescending(p => p.DateCreated)
            //                                                .Skip(page * limit)
            //                                                .Take(limit)
            //                                                .Include(p => p.Cat)
            //                                                .ToListAsync();

            //return Ok(products);
            return new AssetPagingModel
            {
                AssetTotal = assetTotal,
                AssetList = ret,

            };
        }
    }
}
