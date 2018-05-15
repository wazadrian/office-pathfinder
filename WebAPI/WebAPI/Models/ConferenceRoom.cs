namespace WebAPI.Models
{
    public class ConferenceRoom : BaseEntity
    {
        public string conferenceRoomId { get; set; }
        public string conferenceRoomName { get; set; }
        public int conferenceRoomNumber { get; set; }
        public int employeeId { get; set; }
        public int guestId { get; set; }
    }
}