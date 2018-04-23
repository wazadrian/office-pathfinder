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
    public class RoomsController : Controller
    {
        private string databaseName = "Office";
        private string collectionName = "RoomsCollection";
   
        [HttpGet]
        public List<Room> Get()
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };

            var roomsQuery = CosmosDbConnection.client.CreateDocumentQuery<Room>(
                UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), queryOptions);

            var rooms = new List<Room>(roomsQuery);

            return rooms;
        }

        [HttpPost]
        public async void CreateRoom([FromBody] Room room)
        {   
            await CreateDocumentIfNotExists(databaseName, collectionName, room);
        }

        private async Task CreateDocumentIfNotExists(string databaseName, string collectionName, Room room)
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
                    await CosmosDbConnection.client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), room);
                }
                else
                {
                    throw;
                }
            }
        }



        [HttpDelete("{id}")]
        public async void DeleteRoomAsync(string id)
        {
            await DeleteRoomDocument(databaseName, collectionName, id);
        }

        private async Task DeleteRoomDocument(string databaseName, string collectionName, string documentId)
        {
            await CosmosDbConnection.client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId));
        }

        [HttpPut("{id}")]
        public async void UpdateRoomAsync(string id, [FromBody] Room room)
        {
            room.id = id;
            await UpdateDocument(databaseName, collectionName, id, room);
        }

        private async Task UpdateDocument(string databaseName, string collectionName, string documentId, Room updatedRoom)
        {
            await CosmosDbConnection.client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId), updatedRoom);
        }
    }
}
