using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.ViewModel;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class AuthorizeController : Controller
    {
        private string _databaseName = "Office";
        private string _collectionName = "AuthorizationCollection";
        private readonly IAuthorizeService _authorizeService;

        public AuthorizeController(IAuthorizeService authorizeService)
        {
            _authorizeService = authorizeService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody] LoginRegisterViewModel model)
        {
            IActionResult response = Unauthorized();
            var admin = new Admin
            {
                login = model.login,
                password = model.password,
            };
            var tokenString = _authorizeService.Authenticate(admin, _databaseName, _collectionName);
            if (tokenString != null)
                return Ok(new { token = tokenString });
            return response;
        }

        [HttpPost("Register"), Authorize]
        public IActionResult Register([FromBody] LoginRegisterViewModel model)
        {
            var admin = new Admin
            {
                login = model.login,
                password = model.password,
            };
            if (_authorizeService.CreateAdminAccount(admin, _databaseName, _collectionName))
            {
                return Ok();
            }
            return BadRequest();
        }
        

        [HttpGet, Authorize]
        public IActionResult GetLoginOfLoggedUser()
        {
            var currentUser = HttpContext.User;
            var login = currentUser.Claims.First(c => c.Type == ClaimTypes.Name).Value;
            return Ok(login);
        }
    }
}