using System;

namespace WebAPI.Models
{
    public class Station : BaseEntity
    {
        public string stationId { get; set; }
        public string employeeId { get; set; }
        public string guestId { get; set; }
    }
}