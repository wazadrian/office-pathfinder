using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class StationsController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "StationsCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public StationsController(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }

        [HttpGet]
        public List<BaseEntity> GetAll()
        {
            var desks =
                 _cosmosDBService.GetAllEntities(_databaseName, _collectionName, "stations");

            return desks;
        }

        [HttpPost]
        public async Task CreateStationAsync([FromBody] Station station)
        {
            await _cosmosDBService.CreateDocumentIfNotExistsAsync(_databaseName, _collectionName, station);
        }

        [HttpDelete("{id}")]
        public async Task DeleteStationAsync(string id)
        {
            await _cosmosDBService.DeleteDocumentAsync(_databaseName, _collectionName, id);
        }

        [HttpPut("{id}")]
        public async Task UpdateStationAsync(string id, [FromBody] Station station)
        {
            station.id = Guid.Parse(id);
            await _cosmosDBService.UpdateDocumentAsync(_databaseName, _collectionName, id, station);
        }
    }
}
