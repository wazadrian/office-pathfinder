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
    public class EmployeesController : Controller
    {
        //private const string _endpointUri = "https://officepathfinder.documents.azure.com:443/";
        //private const string _primaryKey = "WPNnm5XPIEcw5INS2Pxb3iNJqJIpNGJ0jqlb0jH7Nn1fgyEcvLTwEI0NCp2MjuPke2MACQKi0FonFnlvoeSCyg==";
        //private DocumentClient _client = new DocumentClient(new Uri(_endpointUri), _primaryKey);

        public EmployeesController()
        {

        }

        [HttpGet]
        public List<Employee> Get()
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };

            var employeesQuery = CosmosDbConnection.client.CreateDocumentQuery<Employee>(
                UriFactory.CreateDocumentCollectionUri("Office", "EmployeesCollection"), queryOptions);

            var employees = new List<Employee>(employeesQuery);

            return employees;
        }

        [HttpPost]
        public async void CreateEmployee([FromBody] Employee employee)
        {
            
            await CreateDocumentIfNotExists("Office", "EmployeesCollection", employee);

        }

        private async Task CreateDocumentIfNotExists(string databaseName, string collectionName, Employee employee)
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
                    await CosmosDbConnection.client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), employee);
                }
                else
                {
                    throw;
                }
            }
        }

        

        [HttpDelete("{id}")]
        public async void DeleteEmployeeAsync(string id)
        {
            //DeleteEmployeeDocument("Office", "EmployeesCollection", id);
            await DeleteEmployeeDocument("Office", "EmployeesCollection", id);

        }

        private async Task DeleteEmployeeDocument(string databaseName, string collectionName, string documentId)
        {
            await CosmosDbConnection.client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId));
        }

        [HttpPut("{id}")]
        public async void UpdateEmployeeAsync(string id, [FromBody] Employee employee)
        {
            employee.id = id;
            await UpdateDocument("Office", "EmployeesCollection", id, employee);
        }

        private async Task UpdateDocument(string databaseName, string collectionName, string documentId, Employee updatedEmployee)
        {
            await CosmosDbConnection.client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId), updatedEmployee);
        }




    }
}
