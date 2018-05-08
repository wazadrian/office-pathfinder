using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ConferenceRoomsController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "ConferenceRoomsCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public ConferenceRoomsController(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }

        [HttpGet]
        public List<BaseEntity> GetAll()
        {
            var conferenceRooms =
                 _cosmosDBService.GetAllEntities(_databaseName, _collectionName, "conferenceRooms");

            return conferenceRooms;
        }

        [HttpPost]
        public async void CreateConferenceRoomAsync([FromBody] ConferenceRoom conferenceRoom)
        {
            await _cosmosDBService.CreateDocumentIfNotExistsAsync(_databaseName, _collectionName, conferenceRoom);
        }

        [HttpDelete("{id}")]
        public async void DeleteConferenceRoomAsync(string id)
        {
            await _cosmosDBService.DeleteDocumentAsync(_databaseName, _collectionName, id);
        }

        [HttpPut("{id}")]
        public async void UpdateConferenceRoomAsync(string id, [FromBody] ConferenceRoom conferenceRoom)
        {
            conferenceRoom.id = Guid.Parse(id);
            await _cosmosDBService.UpdateDocumentAsync(_databaseName, _collectionName, id, conferenceRoom);
        }
    }
}
