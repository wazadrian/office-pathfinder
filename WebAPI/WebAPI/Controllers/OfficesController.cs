using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class OfficesController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "OfficesCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public OfficesController(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }

        [HttpGet]
        public List<BaseEntity> GetAll()
        {
            var offices =
                 _cosmosDBService.GetAllEntities(_databaseName, _collectionName, "offices");

            return offices;
        }

        [HttpPost]
        public async Task CreateOfficeAsync([FromBody] Office office)
        {
            await _cosmosDBService.CreateDocumentIfNotExistsAsync(_databaseName, _collectionName, office);
        }

        [HttpDelete("{id}")]
        public async Task DeleteOfficeAsync(string id)
        {
            await _cosmosDBService.DeleteDocumentAsync(_databaseName, _collectionName, id);
        }

        [HttpPut("{id}")]
        public async Task UpdateOfficeAsync(string id, [FromBody] Office office)
        {
            office.id = Guid.Parse(id);
            await _cosmosDBService.UpdateDocumentAsync(_databaseName, _collectionName, id, office);
        }
    }
}
