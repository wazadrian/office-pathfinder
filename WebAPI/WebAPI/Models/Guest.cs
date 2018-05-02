using Newtonsoft.Json;

namespace WebAPI.Models
{
    public class Guest : BaseEntity
    {
        public string name { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
