using Newtonsoft.Json;

namespace WebAPI.Models
{
    public class Desk : BaseEntity
    {
        public string svgId { get; set; }
        public string employeeId { get; set; }
        public string guestId { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
