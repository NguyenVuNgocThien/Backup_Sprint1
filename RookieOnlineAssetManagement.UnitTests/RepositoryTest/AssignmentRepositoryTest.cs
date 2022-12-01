using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models.Assignment;
using RookieOnlineAssetManagement.Profiles;
using RookieOnlineAssetManagement.Repositories;
using RookieOnlineAssetManagement.UnitTests.TestData;
using System;
using System.Collections.Generic;

using Xunit;

namespace RookieOnlineAssetManagement.UnitTests.RepositoryTest
{

    public class AssignmentRepositoryTest : IDisposable
    {
        private readonly DbContextOptions<ApplicationDbContext> _options;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly List<Assignment> _assignments;

        public AssignmentRepositoryTest()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase("AssignmentTestDB").Options;
            _context = new ApplicationDbContext(_options);
            _mapper = new MapperConfiguration(cfg => cfg.AddProfile(new AssignmentProfile())).CreateMapper();
            _assignments = AssignmentTestData.GetAssignments();
            _context.Database.EnsureDeleted();
            _context.Assignments.AddRange(_assignments);
            _context.SaveChanges();
        }

        [Fact]
        public void GetAssignmentById_ValidId_ShouldReturnAssignmentDTO()
        {
            //Arrange
            var assignmentId = 1; // parameter
            var assignmentFake = AssignmentTestData.FakeAssignment(); // return assignment DTO have Id = 1

            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.GetAssignmentById(assignmentId).Result;

            // Assert
            Assert.NotNull(result);
            Assert.IsType<AssignmentDetailDTO>(result);
            Assert.Equal(assignmentFake.Id, result.Id);
        }                
        [Fact]
        public void GetAssignmentById_AssignmentNotHaveInDatabase_ShouldReturnNull()
        {
            //Arrange
            var assignmentId = 10; // parameter
            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.GetAssignmentById(assignmentId).Result;

            // Assert
            Assert.Null(result);
        }  
        
        [Fact]
        public void AcceptAssignmentById_ValidId_StateShouldBeChangeToAccepted()
        {
            //Arrange
            var assignmentId = 1; // parameter
            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.AcceptAssignmentById(assignmentId).Result;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(Enum.AssignmentState.Accepted, result.State);
        }        
        [Fact]
        public void AcceptAssignmentById_AssignmentNotHaveInDatabase_ShouldReturnNull()
        {
            //Arrange
            var assignmentId = 10; // parameter
            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.AcceptAssignmentById(assignmentId).Result;

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void DeclineAssignmentById_ValidId_IsDisabledPropShouldBeTrue()
        {
            //Arrange
            var assignmentId = 1; // parameter
            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.DisabledAssignmentById(assignmentId).Result;

            // Assert
            Assert.NotNull(result);
            Assert.True(result.IsDisabled);
        }
        [Fact]
        public void DeclineAssignmentById_AssignmentNotHaveInDatabase_ShouldReturnNull()
        {
            //Arrange
            var assignmentId = 10; // parameter
            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.DisabledAssignmentById(assignmentId).Result;

            // Assert
            Assert.Null(result);
        }

        [Theory]
        [InlineData("UserB", null, null, 5, 5)]
        [InlineData("UserB", "assetCode", "asc", 5, 5)]
        [InlineData("UserB", "assetName", "asc", 5, 5)]
        [InlineData("UserB", "category", "asc", 5, 5)]
        [InlineData("UserB", "assignedDate", "asc", 5, 5)]
        [InlineData("UserB", "state", "asc", 5, 5)]        
        [InlineData("UserB", "assetCode", "desc", 5, 5)]
        [InlineData("UserB", "assetName", "desc", 5, 5)]
        [InlineData("UserB", "category", "desc", 5, 5)]
        [InlineData("UserB", "assignedDate", "desc", 5, 5)]
        [InlineData("UserB", "state", "desc", 5, 5)]
        public void GetAssignmentListOfUserById_ValidUserIdOfAssigment_TotalItemShouldBeMoreThanZero(string userId, string fieldName, string sortType, int? queryPage, int limit)
        {
            //Arrange
            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.GetAssignmentListOfUserById(userId, fieldName, sortType, queryPage, limit);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<AssignmentPagingModel>(result);
            Assert.True(((AssignmentPagingModel)result).TotalItem  > 0);
        }        
        [Theory]
        [InlineData("A", null, null, 5, 5)]
        [InlineData("A", "assetCode", "asc", 5, 5)]
        [InlineData("A", "assetName", "asc", 5, 5)]
        [InlineData("A", "category", "asc", 5, 5)]
        [InlineData("A", "assignedDate", "asc", 5, 5)]
        [InlineData("A", "state", "asc", 5, 5)]        
        [InlineData("A", "assetCode", "desc", 5, 5)]
        [InlineData("A", "assetName", "desc", 5, 5)]
        [InlineData("A", "category", "desc", 5, 5)]
        [InlineData("A", "assignedDate", "desc", 5, 5)]
        [InlineData("A", "state", "desc", 5, 5)]
        public void GetAssignmentListOfUserById_InvalidUserIdOfAssigment_TotalItemShouldBeByZero(string userId, string fieldName, string sortType, int? queryPage, int limit)
        {
            //Arrange
            AssignmentRepository assignmentRepo = new AssignmentRepository(_mapper, _context);

            // Act
            var result = assignmentRepo.GetAssignmentListOfUserById(userId, fieldName, sortType, queryPage, limit);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<AssignmentPagingModel>(result);
            Assert.False(((AssignmentPagingModel)result).TotalItem  > 0);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
