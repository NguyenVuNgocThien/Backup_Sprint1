using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using RookieOnlineAssetManagement.Models;
using Microsoft.AspNetCore.Authorization;
using RookieOnlineAssetManagement.Interface;
using Microsoft.AspNetCore.Identity;
using RookieOnlineAssetManagement.Entities;
using System;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AssignmentsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IAssignmentRepository _assignmentRepository;

        public AssignmentsController(IAssignmentRepository assignmentRepository, UserManager<User> userManager)
        {
            _userManager = userManager;
            _assignmentRepository = assignmentRepository;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> GetAssignmentsHomePage(string fieldName, string sortType, int? page, int limit)
        {
            var currUser = await _userManager.GetUserAsync(User);
            if (currUser != null)
            {
                var assignments = _assignmentRepository.GetAssignmentListOfUserById(currUser.Id, fieldName, sortType, page, limit);
                return Ok(assignments);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetAssignmentDetail(int id)
        {
            var assignment = await _assignmentRepository.GetAssignmentById(id);
            return Ok(assignment);
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult> AcceptAssignment(int id)
        {
            var assignment = await _assignmentRepository.AcceptAssignmentById(id);
            if (assignment != null)
            {
                return NoContent();
            } else
            {
                return NotFound("Invalid assignment id");
            }    
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult> DeclineAssignment(int id)
        {
            var assignment = await _assignmentRepository.DisabledAssignmentById(id);
            if (assignment != null)
            {
                return NoContent();
            }
            else
            {
                return NotFound("Invalid assignment id");
            }
        }
        
        [HttpGet("[action]")]
        public async Task<ActionResult<List<AssignmentDTO>>> GetAssignmentById(int id)
        {
            var assignment = await _assignmentRepository.GetAsync(id);
            return Ok(assignment);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<AssignmentDTO>> CreateAssignment(CreateAssignmentModel assignment)
        {
            var assignor = await _userManager.GetUserAsync(User);
            var newAssignment = await _assignmentRepository.CreateAssignmentAsync(assignor, assignment);
            return CreatedAtAction(
                nameof(GetAssignmentById),
                new { id = newAssignment.Id },
                newAssignment);
        }
    }
}
