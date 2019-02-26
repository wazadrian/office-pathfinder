using System;

namespace WebAPI.Models
{
    public class ConferenceRoom : BaseEntity
    {
        public string conferenceRoomId { get; set; }
        public string conferenceRoomName { get; set; }
        public string conferenceRoomNumber { get; set; }
        public string employeeId { get; set; }
        public string guestId { get; set; }
    }
}