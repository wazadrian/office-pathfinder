using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Guest
    {
        [JsonProperty(PropertyName = "id")]
        public string id { get; set; }
        public string name { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
