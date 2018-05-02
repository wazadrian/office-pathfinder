using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class RoomsController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "RoomsCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public RoomsController(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }

        [HttpGet]
        public List<BaseEntity> GetAll()
        {
            var rooms =
                 _cosmosDBService.GetAllEntities(_databaseName, _collectionName, "rooms");

            return rooms;
        }

        [HttpPost]
        public async void CreateRoomAsync([FromBody] Room room)
        {
            await _cosmosDBService.CreateDocumentIfNotExistsAsync(_databaseName, _collectionName, room);
        }

        [HttpDelete("{id}")]
        public async void DeleteRoomAsync(string id)
        {
            await _cosmosDBService.DeleteDocumentAsync(_databaseName, _collectionName, id);
        }

        [HttpPut("{id}")]
        public async void UpdateRoomAsync(string id, [FromBody] Room room)
        {
            room.id = Guid.Parse(id);
            await _cosmosDBService.UpdateDocumentAsync(_databaseName, _collectionName, id, room);
        }
    }
}
