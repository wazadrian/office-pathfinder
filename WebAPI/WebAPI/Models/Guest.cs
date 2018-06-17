using System;

namespace WebAPI.Models
{
    public class Guest : BaseEntity
    {
        public Guid id { get; set; }
        public string guestName { get; set; }
        public string guestSurname { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string placeId { get; set; }
    }
}