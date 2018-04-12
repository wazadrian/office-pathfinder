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
        private const string _endpointUri = "https://officepathfinder.documents.azure.com:443/";
        private const string _primaryKey = "WPNnm5XPIEcw5INS2Pxb3iNJqJIpNGJ0jqlb0jH7Nn1fgyEcvLTwEI0NCp2MjuPke2MACQKi0FonFnlvoeSCyg==";
        private DocumentClient _client = new DocumentClient(new Uri(_endpointUri), _primaryKey);

        public EmployeesController()
        {

        }

        [HttpGet]
        public List<Employee> Get()
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };

            var employeesQuery = _client.CreateDocumentQuery<Employee>(
                UriFactory.CreateDocumentCollectionUri("Office", "EmployeesCollection"), queryOptions);

            var employees = new List<Employee>(employeesQuery);

            return employees;
        }

        [HttpPost]
        public IActionResult CreateEmployee(Employee employee)
        {
            employee.employeeId = 2313;
            employee.employeeName = "Dupson";

            CreateFamilyDocumentIfNotExists("Office", "EmployeesCollection", employee);

            return Ok();
        }

        private async Task CreateFamilyDocumentIfNotExists(string databaseName, string collectionName, Employee employee)
        {
            try
            {
                Guid documentId = Guid.NewGuid();
                await this._client.ReadDocumentAsync(UriFactory.CreateDocumentUri(databaseName, collectionName, documentId.ToString()));
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await this._client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseName, collectionName), employee);
                }
                else
                {
                    throw;
                }
            }
        }
    }
}
