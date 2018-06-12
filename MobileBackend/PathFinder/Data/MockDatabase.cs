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
                    employeeId = 0,
                    employeeName = "John",
                    employeeSurname = "Locke",
                    employeePosition = "IT",
                    placeId = "station20"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 0,
                    employeeName = "Kevin",
                    employeeSurname = "Cochran",
                    employeePosition = "IT",
                    placeId = "station21"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 0,
                    employeeName = "George",
                    employeeSurname = "Bates",
                    employeePosition = "IT",
                    placeId = "station22"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 0,
                    employeeName = "Noah",
                    employeeSurname = "Dyer",
                    employeePosition = "IT",
                    placeId = "station23"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 0,
                    employeeName = "Lucas",
                    employeeSurname = "Phelps",
                    employeePosition = "IT",
                    placeId = "station24"
                },
                new Employee
                {
                    id = Guid.NewGuid(),
                    employeeId = 0,
                    employeeName = "Jacob",
                    employeeSurname = "Andrews",
                    employeePosition = "IT",
                    placeId = "station25"
                }
            };

            _stations = new List<Station>();
            _rooms = new List<Room>();
            _offices = new List<Office>();
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