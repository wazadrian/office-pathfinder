using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class AuthorizeService : IAuthorizeService
    {
        private const string CollectionName = "AdministratorsCollection";
        private readonly IConfiguration _config;
        private readonly ICosmosDBRepository<Admin> _repository;

        public AuthorizeService(IConfiguration config, ICosmosDBRepository<Admin> repository)
        {
            _config = config;
            _repository = repository;
        }

        public string Authenticate(Admin admin)
        {
            if (CheckLoginAndPassword(admin))
                return BuildToken(admin);

            return null;
        }

        private bool CheckLoginAndPassword(Admin admin)
        {
            var entities = _repository.GetAllEntities(CollectionName);

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

        public async Task<bool> CreateAdminAccount(Admin admin)
        {
            if (LoginExist(admin))
                return false;

            admin.password = Eramake.eCryptography.Encrypt(admin.password);

            await _repository.InsertEntityAsync(CollectionName, admin);
            return true;
        }

        private bool LoginExist(Admin admin)
        {
            var entities = _repository.GetAllEntities(CollectionName);
            if (entities.Exists(p => p.login == admin.login))
                return true;

            return false;
        }
    }
}