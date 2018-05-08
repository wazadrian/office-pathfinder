using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IAuthorizeService
    {
        string Authenticate(Admin admin, string databaseName, string collectionName);
        bool CreateAdminAccount(Admin admin, string databaseName, string collectionName);
    }
}
