using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class CosmosDBService : ICosmosDBService
    {
        private const string EndpointUri = "https://officepathfinder.documents.azure.com:443/";
        private const string PrimaryKey = "WPNnm5XPIEcw5INS2Pxb3iNJqJIpNGJ0jqlb0jH7Nn1fgyEcvLTwEI0NCp2MjuPke2MACQKi0FonFnlvoeSCyg==";
        private readonly DocumentClient _client;

        public CosmosDBService()
        {
            _client = new DocumentClient(new Uri(EndpointUri), PrimaryKey);
        }

        public List<BaseEntity> GetAllEntities(string databaseName, string collectionName, string entityType)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var documentUri = UriFactory.CreateDocumentCollectionUri(databaseName, collectionName);
            IOrderedQueryable<BaseEntity> query;

            switch (entityType)
            {
                case "employees":
                    query = _client.CreateDocumentQuery<Employee>(documentUri, queryOptions);
                    break;
                case "desks":
                    query = _client.CreateDocumentQuery<Desk>(documentUri, queryOptions);
                    break;
                case "guests":
                    query = _client.CreateDocumentQuery<Guest>(documentUri, queryOptions);
                    break;
                case "rooms":
                    query = _client.CreateDocumentQuery<Room>(documentUri, queryOptions);
                    break;
                default:
                    query = null;
                    break;
            }

            var entities = new List<BaseEntity>(query);
            return entities;
        }

        public async Task CreateDocumentIfNotExistsAsync(string databaseName, string collectionName, BaseEntity entity)
        {
            try
            {
                var documentId = Guid.NewGuid();
                entity.id = documentId;
                var documentUri = UriFactory.CreateDocumentUri(databaseName, collectionName, entity.id.ToString());
                await _client.ReadDocumentAsync(documentUri);
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    var documentUri = UriFactory.CreateDocumentCollectionUri(databaseName, collectionName);
                    await _client.CreateDocumentAsync(documentUri, entity);
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task DeleteDocumentAsync(string databaseName, string collectionName, string documentId)
        {
            var documentUri = UriFactory.CreateDocumentUri(databaseName, collectionName, documentId);
            await _client.DeleteDocumentAsync(documentUri);
        }

        public async Task UpdateDocumentAsync(string databaseName, string collectionName, string documentId, BaseEntity updatedEntity)
        {
            var documentUri = UriFactory.CreateDocumentUri(databaseName, collectionName, documentId);
            await _client.ReplaceDocumentAsync(documentUri, updatedEntity);
        }
    }
}
