using Microsoft.AspNetCore.Authorization;
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
        private const string CollectionName = "OfficesCollection";
        private readonly ICosmosDBRepository<Office> _repository;

        public OfficesController(ICosmosDBRepository<Office> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<Office> GetAll()
        {
            var offices =
                 _repository.GetAllEntities(CollectionName);

            return offices;
        }

        [HttpPost, Authorize]
        public async Task CreateOfficeAsync([FromBody] Office office)
        {
            await _repository.InsertEntityAsync(CollectionName, office);
        }

        [HttpDelete("{id}"), Authorize]
        public async Task DeleteOfficeAsync(string id)
        {
            await _repository.DeleteEntityAsync(CollectionName, id);
        }

        [HttpPut("{id}"), Authorize]
        public async Task UpdateOfficeAsync(string id, [FromBody] Office office)
        {
            office.id = Guid.Parse(id).ToString();
            await _repository.UpdateEntityAsync(CollectionName, id, office);
        }
    }
}
