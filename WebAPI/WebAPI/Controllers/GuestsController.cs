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
        private const string CollectionName = "GuestsCollection";
        private readonly ICosmosDBRepository<Guest> _repository;

        public GuestsController(ICosmosDBRepository<Guest> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<Guest> GetAll()
        {
            var guests =
                 _repository.GetAllEntities(CollectionName);

            return guests;
        }

        [HttpPost]
        public async Task CreateGuestAsync([FromBody] Guest guest)
        {
            await _repository.InsertEntityAsync(CollectionName, guest);
        }

        [HttpDelete("{id}")]
        public async Task DeleteGuestAsync(string id)
        {
            await _repository.DeleteEntityAsync(CollectionName, id);
        }

        [HttpPut("{id}")]
        public async Task UpdateGuestAsync(string id, [FromBody] Guest guest)
        {
            guest.id = Guid.Parse(id).ToString();
            await _repository.UpdateEntityAsync(CollectionName, id, guest);
        }
    }
}
