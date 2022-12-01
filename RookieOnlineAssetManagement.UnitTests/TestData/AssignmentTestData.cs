using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models.Assignment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.UnitTests.TestData
{
    public class AssignmentTestData
    {
        public static List<Assignment> GetAssignments()
        {
            return new List<Assignment>() {
                new Assignment() {
                    Id = 1,
                    AssignedBy = "UserA",
                    AssignedTo = "UserB",
                    AssignedDate = DateTime.Now,
                    State = Enum.AssignmentState.WaitingForAcceptance,
                    IsDisabled = false,
                    Note = "test"
                },                
                new Assignment() {
                    Id = 2,
                    AssignedBy = "UserA",
                    AssignedTo = "UserB",
                    AssignedDate = DateTime.Now,
                    State = Enum.AssignmentState.WaitingForAcceptance,
                    IsDisabled = false,
                    Note = "test"
                },               
                new Assignment() {
                    Id = 3,
                    AssignedBy = "UserA",
                    AssignedTo = "UserB",
                    AssignedDate = DateTime.Now,
                    State = Enum.AssignmentState.WaitingForAcceptance,
                    IsDisabled = false,
                    Note = "test"
                },               
                new Assignment() {
                    Id = 4,
                    AssignedBy = "UserA",
                    AssignedTo = "UserB",
                    AssignedDate = DateTime.Now,
                    State = Enum.AssignmentState.WaitingForAcceptance,
                    IsDisabled = false,
                    Note = "test"
                },
               
            };
        }

        public static AssignmentDetailDTO FakeAssignment()
        {
            return new AssignmentDetailDTO
            {
                Id = 1,
                AssignedBy = "UserA",
                AssignedTo = "UserB",
                AssignedDate = DateTime.Now,
                State = Enum.AssignmentState.WaitingForAcceptance,
                Note = "test"
            };
        }
    }
}
