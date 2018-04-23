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
    public class DesksController : Controller
    {
        private string databaseName = "Office";
        private string collectionName = "DesksCollection";
   
        [HttpGet]
        public List<Desk> Get()
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };

            var desksQuery = CosmosDbConnection.client.CreateDocumentQuery<Desk>(
                UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), queryOptions);

            var desks = new List<Desk>(desksQuery);

            return desks;
        }

        [HttpPost]
        public async void CreateDesk([FromBody] Desk desk)
        {   
            await CreateDocumentIfNotExists(databaseName, collectionName, desk);
        }

        private async Task CreateDocumentIfNotExists(string databaseName, string collectionName, Desk desk)
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
                    await CosmosDbConnection.client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), desk);
                }
                else
                {
                    throw;
                }
            }
        }



        [HttpDelete("{id}")]
        public async void DeleteDeskAsync(string id)
        {
            await DeleteDeskDocument(databaseName, collectionName, id);
        }

        private async Task DeleteDeskDocument(string databaseName, string collectionName, string documentId)
        {
            await CosmosDbConnection.client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId));
        }

        [HttpPut("{id}")]
        public async void UpdateDeskAsync(string id, [FromBody] Desk desk)
        {
            desk.id = id;
            await UpdateDocument(databaseName, collectionName, id, desk);
        }

        private async Task UpdateDocument(string databaseName, string collectionName, string documentId, Desk updatedDesk)
        {
            await CosmosDbConnection.client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId), updatedDesk);
        }
    }
}
