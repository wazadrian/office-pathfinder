using System;

namespace WebAPI.Models
{
    public class Office : BaseEntity
    {
        public string officeId { get; set; }
        public string officeName { get; set; }
        public string officeNumber { get; set; }
        public string employeeId { get; set; }
        public string guestId { get; set; }
    }
}