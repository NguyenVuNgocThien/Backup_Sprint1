using System;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Enum;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System.Linq;
using RookieOnlineAssetManagement.Models.Assignment;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RookieOnlineAssetManagement.Repositories;
public class AssignmentRepository : IAssignmentRepository, IDisposable
{
    private readonly IMapper _mapper;
    private readonly ApplicationDbContext _context;

    public AssignmentRepository(IMapper mapper, ApplicationDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public AssignmentPagingModel GetAssignmentListOfUserById(string userId, string fieldName, string sortType, int? queryPage, int limit)
    {
        // Query data
        var query = _context.Assignments
            .Where(m => m.AssignedTo == userId &&
                    m.IsDisabled == false &&
                    m.AssignedDate.Date <= DateTime.Today)
            .Include(m => m.Asset)
            .Include(m => m.Asset.Category)
            .Select(m => new AssignmentViewDTO
            {
                AssignmentId = m.Id,
                AssetCode = m.Asset.AssetCode,
                AssetName = m.Asset.AssetName,
                Category = m.Asset.Category.Name,
                AssignedDate = m.AssignedDate,
                State = m.State
            });

        // Sort
        if (!string.IsNullOrEmpty(fieldName) && fieldName == "assetCode")
        {
            if (sortType == "asc")
            {
                query = query.OrderBy(m => m.AssetCode);

            }
            else if (sortType == "desc")
            {
                query = query.OrderByDescending(m => m.AssetCode);
            }
        }
        else if (!string.IsNullOrEmpty(fieldName) && fieldName == "assetName")
        {
            if (sortType == "asc")
            {
                query = query.OrderBy(m => m.AssetName);

            }
            else if (sortType == "desc")
            {
                query = query.OrderByDescending(m => m.AssetName);
            }
        }
        else if (!string.IsNullOrEmpty(fieldName) && fieldName == "category")
        {
            if (sortType == "asc")
            {
                query = query.OrderBy(m => m.Category);

            }
            else if (sortType == "desc")
            {
                query = query.OrderByDescending(m => m.Category);
            }
        }
        else if (!string.IsNullOrEmpty(fieldName) && fieldName == "assignedDate")
        {
            if (sortType == "asc")
            {
                query = query.OrderBy(m => m.AssignedDate);

            }
            else if (sortType == "desc")
            {
                query = query.OrderByDescending(m => m.AssignedDate);
            }
        }
        else if (!string.IsNullOrEmpty(fieldName) && fieldName == "state")
        {
            if (sortType == "asc")
            {
                query = query.OrderBy(m => m.State);

            }
            else if (sortType == "desc")
            {
                query = query.OrderByDescending(m => m.State);
            }
        }

        // Paging
        int page = queryPage.GetValueOrDefault(1) == 0 ? 1 : queryPage.GetValueOrDefault(1);
        var total = query.Count();

        return new AssignmentPagingModel
        {
            Assignments = query.Skip((page - 1) * limit).Take(limit),
            TotalItem = total,
            Page = page,
            LastPage = (int)Math.Ceiling(Decimal.Divide(total, limit))
        };
    }
    public async Task<AssignmentDetailDTO> GetAssignmentById(int assignmentId)
    {
        var assignment = await _context.Assignments
            .Where(m => m.Id == assignmentId)
            .Include(m => m.Asset)
            .Include(m => m.AssignedToUser)
            .Include(m => m.AssignedByUser)
            .Include(m => m.Asset.Category)
            .Select(m => new AssignmentDetailDTO
            {
                AssetCode = m.Asset.AssetCode,
                AssetName = m.Asset.AssetName,
                Specification = m.Asset.Specification,
                AssignedTo = m.AssignedToUser.UserName,
                AssignedBy = m.AssignedByUser.UserName,
                AssignedDate = m.AssignedDate,
                State = m.State,
                Note = m.Note
            }).FirstOrDefaultAsync();
        return assignment;
    }
    public async Task<Assignment> AcceptAssignmentById(int assignmentId)
    {
        var assignment = await _context.Assignments.FindAsync(assignmentId);

        if (assignment != null)
        {
            assignment.State = AssignmentState.Accepted;
            await _context.SaveChangesAsync();
        }
        return assignment;
    }
    public async Task<Assignment> DisabledAssignmentById(int assignmentId)
    {
        var assignment = await _context.Assignments.FindAsync(assignmentId);

        if (assignment != null)
        {
            assignment.IsDisabled = true;
            await _context.SaveChangesAsync();
        }
        return assignment;
    }

    public async Task<AssignmentDTO> GetAsync(int id)
    {
        var assignment = await _context.Assignments
            .Include(x => x.Asset)
            .Include(x => x.AssignedByUser)
            .Include(x => x.AssignedToUser)
            .FirstOrDefaultAsync(x => x.Id == id);
        return _mapper.Map<AssignmentDTO>(assignment);
    }
    public async Task<AssignmentDTO> CreateAssignmentAsync(User assignor, CreateAssignmentModel assignment)
    {
        var assignee = await _context.Users.FirstOrDefaultAsync(x => x.StaffCode == assignment.StaffCode);
        var asset = await _context.Assets.FirstOrDefaultAsync(x => x.AssetCode == assignment.AssetCode);
        var newAssignment = new Assignment
        {
            AssignedByUser = assignor,
            AssignedToUser = assignee,
            Asset = asset,
            AssignedDate = assignment.AssignedDate,
            State = AssignmentState.WaitingForAcceptance,
            Note = assignment.Note,
        };
        await _context.Assignments.AddAsync(newAssignment);
        await _context.SaveChangesAsync();
        var assignmentDTO = _mapper.Map<AssignmentDTO>(newAssignment);
        return assignmentDTO;
    }
    private bool disposed = false;

    protected virtual void Dispose(bool disposing)
    {
        if (!this.disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
        this.disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
