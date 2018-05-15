using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebAPI.Interfaces;
using WebAPI.Models;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ConferenceRoomsController : Controller
    {
        private const string CollectionName = "ConferenceRoomsCollection";
        private readonly ICosmosDBRepository<ConferenceRoom> _repository;

        public ConferenceRoomsController(ICosmosDBRepository<ConferenceRoom> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<ConferenceRoom> GetAll()
        {
            var conferenceRooms =
                 _repository.GetAllEntities(CollectionName);

            return conferenceRooms;
        }

        [HttpPost]
        public async Task CreateConferenceRoomAsync([FromBody] ConferenceRoom conferenceRoom)
        {
            await _repository.InsertEntityAsync(CollectionName, conferenceRoom);
        }

        [HttpDelete("{id}")]
        public async Task DeleteConferenceRoomAsync(string id)
        {
            await _repository.DeleteEntityAsync(CollectionName, id);
        }

        [HttpPut("{id}")]
        public async Task UpdateConferenceRoomAsync(string id, [FromBody] ConferenceRoom conferenceRoom)
        {
            conferenceRoom.id = Guid.Parse(id);
            await _repository.UpdateEntityAsync(CollectionName, id, conferenceRoom);
        }
    }
}