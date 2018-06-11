using Microsoft.Azure.Documents.Client;
using MobileBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MobileBackend.Data
{
    public class CosmosDBRepository
    {
        private const string EndpointUri = "https://officepathfinder.documents.azure.com:443/";
        private const string PrimaryKey = "WPNnm5XPIEcw5INS2Pxb3iNJqJIpNGJ0jqlb0jH7Nn1fgyEcvLTwEI0NCp2MjuPke2MACQKi0FonFnlvoeSCyg==";
        private const string DatabaseName = "Office";
        private readonly DocumentClient _client;

        public CosmosDBRepository()
        {
            var serviceEndpoint = new Uri(EndpointUri);
            _client = new DocumentClient(serviceEndpoint, PrimaryKey);
        }

        public List<Employee> GetAllEmployees()
        {
            string collectionName = "EmployeesCollection";
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var documentUri = UriFactory.CreateDocumentCollectionUri(DatabaseName, collectionName);
            IOrderedQueryable<Employee> query;
            query = _client.CreateDocumentQuery<Employee>(documentUri, queryOptions);
            var employees = new List<Employee>(query);
            return employees;
        }

        public List<Station> GetAllStations()
        {
            string collectionName = "StationsCollection";
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var documentUri = UriFactory.CreateDocumentCollectionUri(DatabaseName, collectionName);
            IOrderedQueryable<Station> query;
            query = _client.CreateDocumentQuery<Station>(documentUri, queryOptions);
            var stations = new List<Station>(query);
            return stations;
        }

        public List<Room> GetAllRooms()
        {
            string collectionName = "RoomsCollection";
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var documentUri = UriFactory.CreateDocumentCollectionUri(DatabaseName, collectionName);
            IOrderedQueryable<Room> query;
            query = _client.CreateDocumentQuery<Room>(documentUri, queryOptions);
            var rooms = new List<Room>(query);
            return rooms;
        }

        public List<Office> GetAllOffices()
        {
            string collectionName = "OfficesCollection";
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var documentUri = UriFactory.CreateDocumentCollectionUri(DatabaseName, collectionName);
            IOrderedQueryable<Office> query;
            query = _client.CreateDocumentQuery<Office>(documentUri, queryOptions);
            var offices = new List<Office>(query);
            return offices;
        }
    }
}