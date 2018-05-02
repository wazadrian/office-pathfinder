using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class DesksController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "DesksCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public DesksController(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }

        [HttpGet]
        public List<BaseEntity> GetAll()
        {
            var desks =
                 _cosmosDBService.GetAllEntities(_databaseName, _collectionName, "desks");

            return desks;
        }

        [HttpPost]
        public async void CreateDeskAsync([FromBody] Desk desk)
        {
            await _cosmosDBService.CreateDocumentIfNotExistsAsync(_databaseName, _collectionName, desk);
        }

        [HttpDelete("{id}")]
        public async void DeleteDeskAsync(string id)
        {
            await _cosmosDBService.DeleteDocumentAsync(_databaseName, _collectionName, id);
        }

        [HttpPut("{id}")]
        public async void UpdateDeskAsync(string id, [FromBody] Desk desk)
        {
            desk.id = Guid.Parse(id);
            await _cosmosDBService.UpdateDocumentAsync(_databaseName, _collectionName, id, desk);
        }
    }
}
