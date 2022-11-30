using AutoMapper;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;

namespace RookieOnlineAssetManagement.Profiles
{
    public class AssetProfile : Profile
    {
        public AssetProfile()
        {
            CreateMap<AssetModel, Asset>().ReverseMap();
        }
    }
}
