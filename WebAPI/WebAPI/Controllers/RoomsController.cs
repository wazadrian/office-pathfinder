using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class RoomsController : Controller
    {
        private const string DatabaseName = "Office";
        private const string CollectionName = "RoomsCollection";
        private readonly ICosmosDBRepository<Room> _repository;

        public RoomsController(ICosmosDBRepository<Room> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<Room> GetAll()
        {
            var rooms =
                 _repository.GetAllEntities(CollectionName);

            return rooms;
        }

        [HttpPost]
        public async Task CreateRoomAsync([FromBody] Room room)
        {
            await _repository.InsertEntityAsync(CollectionName, room);
        }

        [HttpDelete("{id}")]
        public async Task DeleteRoomAsync(string id)
        {
            await _repository.DeleteEntityAsync(CollectionName, id);
        }

        [HttpPut("{id}")]
        public async Task UpdateRoomAsync(string id, [FromBody] Room room)
        {
            room.id = Guid.Parse(id);
            await _repository.UpdateEntityAsync(CollectionName, id, room);
        }
    }
}