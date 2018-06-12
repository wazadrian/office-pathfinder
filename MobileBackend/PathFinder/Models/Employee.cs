using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileBackend.Models
{
    public class Employee : BaseEntity
    {
        public int employeeId { get; set; }
        public string employeeName { get; set; }
        public string employeeSurname { get; set; }
        public string employeePosition { get; set; }
        public string placeId { get; set; }
    }
}
