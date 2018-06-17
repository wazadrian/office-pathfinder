using System;

namespace WebAPI.Models
{
    public class Employee : BaseEntity
    {
        public Guid id { get; set; }
        public string employeeName { get; set; }
        public string employeeSurname { get; set; }
        public string employeePosition { get; set; }
        public string placeId { get; set; }
    }
}