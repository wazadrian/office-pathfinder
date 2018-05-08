using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class AuthorizeService : IAuthorizeService
    {
        private const string EndpointUri = "https://officepathfinder.documents.azure.com:443/";
        private const string PrimaryKey = "WPNnm5XPIEcw5INS2Pxb3iNJqJIpNGJ0jqlb0jH7Nn1fgyEcvLTwEI0NCp2MjuPke2MACQKi0FonFnlvoeSCyg==";
        private readonly DocumentClient _client;
        IConfiguration _config;

        public AuthorizeService(IConfiguration config)
        {
            _client = new DocumentClient(new Uri(EndpointUri), PrimaryKey);
            _config = config;
        }

        public string Authenticate(Admin admin, string databaseName, string collectionName)
        {
            if (CheckLoginAndPassword(admin, databaseName, collectionName))
            {
                return BuildToken(admin);
            }
            return null;
        }

        private bool CheckLoginAndPassword(Admin admin, string databaseName, string collectionName)
        {
            var queryOptions = new FeedOptions { MaxItemCount = -1 };
            var documentUri = UriFactory.CreateDocumentCollectionUri(databaseName, collectionName);
            var query = _client.CreateDocumentQuery<Admin>(documentUri, queryOptions);
            var entities = new List<Admin>(query);

            if (entities.Exists(p => p.login == admin.login
            && p.password == Eramake.eCryptography.Encrypt(admin.password)))
            {
                return true;
            }
            return false;
        }

        private string BuildToken(Admin admin)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.UniqueName, admin.login),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(600),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
