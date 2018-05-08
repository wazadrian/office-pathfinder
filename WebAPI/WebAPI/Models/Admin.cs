using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Admin
    {
        [JsonProperty(PropertyName = "id")]
        public Guid id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
    }
}
