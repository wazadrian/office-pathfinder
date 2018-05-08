using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "EmployeesCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public EmployeesController(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }

        [HttpGet]
        public List<BaseEntity> GetAll()
        {
            var employees =
                 _cosmosDBService.GetAllEntities(_databaseName, _collectionName, "employees");

            return employees;
        }

        [HttpPost]
        public async void CreateEmployeeAsync([FromBody] Employee employee)
        {
            await _cosmosDBService.CreateDocumentIfNotExistsAsync(_databaseName, _collectionName, employee);
        }

        [HttpDelete("{id}")]
        public async void DeleteEmployeeAsync(string id)
        {
            await _cosmosDBService.DeleteDocumentAsync(_databaseName, _collectionName, id);
        }

        [HttpPut("{id}")]
        public async void UpdateEmployeeAsync(string id, [FromBody] Employee employee)
        {
            employee.id = Guid.Parse(id);
            await _cosmosDBService.UpdateDocumentAsync(_databaseName, _collectionName, id, employee);
        }
    }
}
