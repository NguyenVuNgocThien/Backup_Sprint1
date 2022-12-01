using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Assignment;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IAssignmentRepository
    {
        AssignmentPagingModel GetAssignmentListOfUserById(string userId, string fieldName, string sortType, int? queryPage, int limit);
        Task<AssignmentDetailDTO> GetAssignmentById(int assignmentId);
        Task<Assignment> AcceptAssignmentById(int assignmentId);
        Task<Assignment> DisabledAssignmentById(int assignmentId);
        Task<AssignmentDTO> CreateAssignmentAsync(User assignor, CreateAssignmentModel assignment);
        Task<AssignmentDTO> GetAsync(int id);
        public Task<List<AssignmentGetDTO>> GetAllAsync();
        public Task<List<AssignmentGetDTO>> GetByPage(int pageNumber, int pageSize);
        public Task<int> CountAllAsync();
        public Task<int> CountAssignmentsAfterFilterAsync(AssignmentFilters filters);
        public Task<List<AssignmentGetDTO>> GetAssignmentsByFilters(int pageNumber, int pageSize, AssignmentFilters filters);
    }
}

