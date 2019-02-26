using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICosmosDBRepository<TEntity>
        where TEntity : BaseEntity
    {
        List<TEntity> GetAllEntities(string collectionName);
        Task InsertEntityAsync(string collectionName, TEntity entity);
        Task DeleteEntityAsync(string collectionName, string documentId);
        Task UpdateEntityAsync(string collectionName, string documentId, TEntity entity);
    }
}