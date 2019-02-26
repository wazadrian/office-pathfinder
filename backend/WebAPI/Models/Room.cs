using System;

namespace WebAPI.Models
{
    public class Room : BaseEntity
    {
        public string roomId { get; set; }
        public string employeeId { get; set; }
        public string guestId { get; set; }
        public string roomName { get; set; }
        public string roomNumber { get; set; }
    }
}