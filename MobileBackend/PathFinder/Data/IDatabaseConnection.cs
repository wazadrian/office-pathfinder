using System.Collections.Generic;
using MobileBackend.Models;

namespace PathFinder.Data
{
    public interface IDatabaseConnection
    {
        List<Employee> GetAllEmployees();
        List<Station> GetAllStations();
        List<Room> GetAllRooms();
        List<Office> GetAllOffices();

    }
}