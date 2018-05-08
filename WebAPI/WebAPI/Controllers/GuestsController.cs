using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class GuestsController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "GuestsCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public GuestsController(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }

        [HttpGet]
        public List<BaseEntity> GetAll()
        {
            var guests =
                 _cosmosDBService.GetAllEntities(_databaseName, _collectionName, "guests");

            return guests;
        }

        [HttpPost]
        public async Task CreateGuestAsync([FromBody] Guest guest)
        {
            await _cosmosDBService.CreateDocumentIfNotExistsAsync(_databaseName, _collectionName, guest);
        }

        [HttpDelete("{id}")]
        public async Task DeleteGuestAsync(string id)
        {
            await _cosmosDBService.DeleteDocumentAsync(_databaseName, _collectionName, id);
        }

        [HttpPut("{id}")]
        public async Task UpdateGuestAsync(string id, [FromBody] Guest guest)
        {
            guest.id = Guid.Parse(id);
            await _cosmosDBService.UpdateDocumentAsync(_databaseName, _collectionName, id, guest);
        }
    }
}
