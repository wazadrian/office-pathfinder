using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private const string CollectionName = "EmployeesCollection";
        private readonly ICosmosDBRepository<Employee> _repository;

        public EmployeesController(ICosmosDBRepository<Employee> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<Employee> GetAll()
        {
            var employees =
                 _repository.GetAllEntities(CollectionName);

            return employees;
        }

        [HttpPost]
        public async Task CreateEmployeeAsync([FromBody] Employee employee)
        {
            await _repository.InsertEntityAsync(CollectionName, employee);
        }

        [HttpDelete("{id}"), Authorize]
        public async Task DeleteEmployeeAsync(string id)
        {
            await _repository.DeleteEntityAsync(CollectionName, id);
        }

        [HttpPut("{id}"), Authorize]
        public async Task UpdateEmployeeAsync(string id, [FromBody] Employee employee)
        {
           // employee.id = Guid.Parse(id);
            await _repository.UpdateEntityAsync(CollectionName, id, employee);
        }
    }
}