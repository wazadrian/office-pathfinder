using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class GuestsController : Controller
    {
        private string databaseName = "Office";
        private string collectionName = "GuestsCollection";
   
        [HttpGet]
        public List<Guest> Get()
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };

            var guestsQuery = CosmosDbConnection.client.CreateDocumentQuery<Guest>(
                UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), queryOptions);

            var guests = new List<Guest>(guestsQuery);

            return guests;
        }

        [HttpPost]
        public async void CreateGuest([FromBody] Guest guest)
        {   
            await CreateDocumentIfNotExists(databaseName, collectionName, guest);
        }

        private async Task CreateDocumentIfNotExists(string databaseName, string collectionName, Guest guest)
        {
            try
            {
                Guid documentId = Guid.NewGuid();
                await CosmosDbConnection.client.ReadDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId.ToString()));
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await CosmosDbConnection.client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), guest);
                }
                else
                {
                    throw;
                }
            }
        }



        [HttpDelete("{id}")]
        public async void DeleteGuestAsync(string id)
        {
            await DeleteGuestDocument(databaseName, collectionName, id);
        }

        private async Task DeleteGuestDocument(string databaseName, string collectionName, string documentId)
        {
            await CosmosDbConnection.client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId));
        }

        [HttpPut("{id}")]
        public async void UpdateGuestAsync(string id, [FromBody] Guest guest)
        {
            guest.id = id;
            await UpdateDocument(databaseName, collectionName, id, guest);
        }

        private async Task UpdateDocument(string databaseName, string collectionName, string documentId, Guest updatedGuest)
        {
            await CosmosDbConnection.client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId), updatedGuest);
        }
    }
}
