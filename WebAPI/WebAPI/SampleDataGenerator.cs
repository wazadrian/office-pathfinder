using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI
{
    public class SampleDataGenerator
    {
        private string _databaseName = "Office";
        private string _collectionName = "EmployeesCollection";
        private readonly ICosmosDBService _cosmosDBService;

        public SampleDataGenerator(ICosmosDBService cosmosDBService)
        {
            _cosmosDBService = cosmosDBService;
        }
    }
}
