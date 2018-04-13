using Newtonsoft.Json;

namespace WebAPI.Models
{
    public class Employee
    {
        [JsonProperty(PropertyName = "id")]
        public string id { get; set; }
        public string employeeName { get; set; }
        public string employeeSurname { get; set; }
        public string employeePosition { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
