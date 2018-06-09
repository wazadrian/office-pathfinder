using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileBackend.Models
{
    public class Room : BaseEntity
    {
        public string roomId { get; set; }
        public int employeeId { get; set; }
        public int guestId { get; set; }
        public string roomName { get; set; }
        public int roomNumber { get; set; }
    }
}
