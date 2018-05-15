using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class CosmosDBRepository<TEntity> : ICosmosDBRepository<TEntity>
        where TEntity : BaseEntity
    {
        private readonly string _endpointUri;
        private readonly string _primaryKey;
        private readonly string _databaseName;
        private readonly DocumentClient _client;

        public CosmosDBRepository(IConfiguration config)
        {
            _endpointUri = config["CosmosDBConfiguration:EndpointUri"];
            _primaryKey = config["CosmosDBConfiguration:PrimaryKey"];
            _databaseName = config["CosmosDBConfiguration:DatabaseName"];
            var serviceEndpoint = new Uri(_endpointUri);
            _client = new DocumentClient(serviceEndpoint, _primaryKey);
        }

        public async Task InsertEntityAsync(string collectionName, TEntity entity)
        {
            var documentId = Guid.NewGuid();
            entity.id = documentId;
            var documentUri = UriFactory.CreateDocumentCollectionUri(_databaseName, collectionName);
            await _client.CreateDocumentAsync(documentUri, entity);
        }

        public async Task DeleteEntityAsync(string collectionName, string documentId)
        {
            var documentUri = UriFactory.CreateDocumentUri(_databaseName, collectionName, documentId);
            await _client.DeleteDocumentAsync(documentUri);
        }

        public List<TEntity> GetAllEntities(string collectionName)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var documentUri = UriFactory.CreateDocumentCollectionUri(_databaseName, collectionName);
            IOrderedQueryable<TEntity> query;
            query = _client.CreateDocumentQuery<TEntity>(documentUri, queryOptions);
            var entities = new List<TEntity>(query);
            return entities;
        }

        public async Task UpdateEntityAsync(string collectionName, string documentId, TEntity entity)
        {
            var documentUri = UriFactory.CreateDocumentUri(_databaseName, collectionName, documentId);
            await _client.ReplaceDocumentAsync(documentUri, entity);
        }
    }
}