using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class StationsController : Controller
    {
        private const string CollectionName = "StationsCollection";
        private readonly ICosmosDBRepository<Station> _repository;

        public StationsController(ICosmosDBRepository<Station> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<Station> GetAll()
        {
            var stations =
                 _repository.GetAllEntities(CollectionName);

            return stations;
        }

        [HttpPost]
        public async Task CreateStationAsync([FromBody] Station station)
        {
            await _repository.InsertEntityAsync(CollectionName, station);
        }

        [HttpDelete("{id}")]
        public async Task DeleteStationAsync(string id)
        {
            await _repository.DeleteEntityAsync(CollectionName, id);
        }

        [HttpPut("{id}")]
        public async Task UpdateStationAsync(string id, [FromBody] Station station)
        {
            station.id = Guid.Parse(id);
            await _repository.UpdateEntityAsync(CollectionName, id, station);
        }
    }
}
