namespace MobileBackend.Models
{
    public class Station : BaseEntity
    {
        public string stationId { get; set; }
        public string stationName { get; set; }
        public int employeeId { get; set; }
        public int guestId { get; set; }
    }
}