using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI
{
    public class CosmosDbConnection
    {
        public static readonly string endpointUri = "https://officepathfinder.documents.azure.com:443/";
        public static readonly string primaryKey = "WPNnm5XPIEcw5INS2Pxb3iNJqJIpNGJ0jqlb0jH7Nn1fgyEcvLTwEI0NCp2MjuPke2MACQKi0FonFnlvoeSCyg==";
        public static DocumentClient client = new DocumentClient(new Uri(endpointUri), primaryKey);
    }
}
