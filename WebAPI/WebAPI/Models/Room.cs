using Newtonsoft.Json;

namespace WebAPI.Models
{
    public class Room : BaseEntity
    {
        public string svgId { get; set; }
        public string name { get; set; }
        public string numberOfRoom { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
