using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileBackend.Models
{
    public class Office : BaseEntity
    {
        public string officeId { get; set; }
        public string officeName { get; set; }
        public int officeNumber { get; set; }
        public int employeeId { get; set; }
        public int guestId { get; set; }
    }
}
