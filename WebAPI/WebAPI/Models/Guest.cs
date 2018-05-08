using Newtonsoft.Json;
using System;

namespace WebAPI.Models
{
    public class Guest : BaseEntity
    {
        public int guestId { get; set; }
        public string guestName { get; set; }
        public string guestSurname { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
