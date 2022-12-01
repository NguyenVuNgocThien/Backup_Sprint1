using AutoMapper;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;

namespace RookieOnlineAssetManagement.Profiles;
public class AssignmentProfile : Profile
{
    public AssignmentProfile()
    {
        CreateMap<Assignment, AssignmentDTO>()
            .ForMember(des => des.AssetCode, src => src.MapFrom(ent => (ent.Asset.AssetCode)))
            .ForMember(des => des.AssetName, src => src.MapFrom(ent => (ent.Asset.AssetName)))
            .ForMember(des => des.Specification, src => src.MapFrom(ent => (ent.Asset.Specification)))
            .ForMember(des => des.AssignedTo, src => src.MapFrom(ent => (ent.AssignedToUser.UserName)))
            .ForMember(des => des.AssignedBy, src => src.MapFrom(ent => (ent.AssignedByUser.UserName)));
    }
}
