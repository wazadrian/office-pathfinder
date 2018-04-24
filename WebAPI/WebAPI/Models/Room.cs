using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Room
    {
        [JsonProperty(PropertyName = "id")]
        public string id { get; set; }
        public string svgId { get; set; }
        public string name { get; set; }
        public string numberOfRoom { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
