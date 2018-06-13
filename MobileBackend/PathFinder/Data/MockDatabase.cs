using System;
using System.Collections.Generic;
using MobileBackend.Models;

namespace PathFinder.Data
{
    public class MockDatabase : IDatabaseConnection
    {
        private readonly List<Employee> _employees;
        private readonly List<Office> _offices;
        private readonly List<Room> _rooms;
        private readonly List<Station> _stations;

        public MockDatabase()
        {
            _employees = new List<Employee>
            {
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 1,
                    employeeName = "John",
                    employeeSurname = "Locke",
                    employeePosition = "IT",
                    placeId = "station20"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 2,
                    employeeName = "Kevin",
                    employeeSurname = "Cochran",
                    employeePosition = "IT",
                    placeId = "station21"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 3,
                    employeeName = "George",
                    employeeSurname = "Bates",
                    employeePosition = "IT",
                    placeId = "station22"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 4,
                    employeeName = "Noah",
                    employeeSurname = "Dyer",
                    employeePosition = "IT",
                    placeId = "station23"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 5,
                    employeeName = "Lucas",
                    employeeSurname = "Phelps",
                    employeePosition = "IT",
                    placeId = "station24"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 6,
                    employeeName = "Jacob",
                    employeeSurname = "Andrews",
                    employeePosition = "IT",
                    placeId = "station25"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 7,
                    employeeName = "John",
                    employeeSurname = "Wick",
                    employeePosition = "IT",
                    placeId = "station26"
                }
            };

            _stations = new List<Station>
            {
                new Station
                {
                    id = Guid.NewGuid(),
                    employeeId = 1,
                    guestId = 1,
                    stationId = "station20",
                    stationName = "Desk 1"
                },
                new Station
                {
                    id = Guid.NewGuid(),
                    employeeId = 2,
                    guestId = 2,
                    stationId = "station21",
                    stationName = "Desk 2"
                }
            };
            _rooms = new List<Room>
            {
                new Room
                {
                    id = Guid.NewGuid(),
                    employeeId = 1,
                    guestId = 1,
                    roomNumber = 1,
                    roomId = "room1",
                    roomName = "Room 1"
                },
                new Room
                {
                    id = Guid.NewGuid(),
                    employeeId = 2,
                    guestId = 2,
                    roomNumber = 2,
                    roomId = "room2",
                    roomName = "Room 2"
                }
            };
            _offices = new List<Office>
            {
                new Office
                {
                    id = Guid.NewGuid(),
                    employeeId = 1,
                    guestId = 1,
                    officeNumber = 1,
                    officeId = "office1",
                    officeName = "Office 1"
                },
                new Office
                {
                    id = Guid.NewGuid(),
                    employeeId = 2,
                    guestId = 2,
                    officeNumber = 2,
                    officeId = "office2",
                    officeName = "Office 2"
                }
            };
        }

        public List<Employee> GetAllEmployees()
        {
            return _employees;
        }

        public List<Station> GetAllStations()
        {
            return _stations;
        }

        public List<Room> GetAllRooms()
        {
            return _rooms;
        }

        public List<Office> GetAllOffices()
        {
            return _offices;
        }
    }
}