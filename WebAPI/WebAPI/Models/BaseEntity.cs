using System;
using Newtonsoft.Json;

namespace WebAPI.Models
{
    public abstract class BaseEntity
    {
        [JsonProperty(PropertyName = "id")]
        public Guid id { get; set; }

        public abstract override string ToString();
    }
}
