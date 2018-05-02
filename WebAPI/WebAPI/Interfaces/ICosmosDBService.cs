using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICosmosDBService
    {
        List<BaseEntity> GetAllEntities(string databaseName, string collectionName, string entityType);
        Task CreateDocumentIfNotExistsAsync(string databaseName, string collectionName, BaseEntity entity);
        Task DeleteDocumentAsync(string databaseName, string collectionName, string documentId);
        Task UpdateDocumentAsync(string databaseName, string collectionName, string documentId, BaseEntity updatedEntity);
    }
}
