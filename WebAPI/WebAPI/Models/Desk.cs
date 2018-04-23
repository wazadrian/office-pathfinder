using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Desk
    {
        [JsonProperty(PropertyName = "id")]
        public string id { get; set; }
        public string employeeId { get; set; }
        public string guestId { get; set; }
        
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
