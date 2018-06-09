using MobileBackend.Data;
using MobileBackend.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;

namespace MobileBackend
{
    public class SearchingEngine
    {
        CosmosDBRepository _repository;
        List<Employee> _employees;
        List<Station> _stations;
        List<Room> _rooms;
        List<Office> _offices;

        public SearchingEngine()
        {
            _repository = new CosmosDBRepository();

            // Do testów można zmienić warunek w tym ifie na false, żeby sprawdzić czy pobiera dane z jsonów
            if (!CheckForInternetConnection())
            {
                _employees = _repository.GetAllEmployees();
                _stations = _repository.GetAllStations();
                _rooms = _repository.GetAllRooms();
                _offices = _repository.GetAllOffices();

                SaveDataToJsons();
            }
            else
            {
                ReadDataFromJsons();
            }
        }

        private bool CheckForInternetConnection()
        {
            try
            {
                using (var client = new WebClient())
                using (client.OpenRead("http://clients3.google.com/generate_204"))
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        private void SaveDataToJsons()
        {
            using (StreamWriter file = File.CreateText("employees.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, _employees);
            }

            using (StreamWriter file = File.CreateText("stations.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, _stations);
            }

            using (StreamWriter file = File.CreateText("rooms.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, _rooms);
            }

            using (StreamWriter file = File.CreateText("offices.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, _offices);
            }
        }

        private void ReadDataFromJsons()
        {
            using (StreamReader reader = new StreamReader("employees.json"))
            {
                var json = reader.ReadToEnd();
                _employees = JsonConvert.DeserializeObject<List<Employee>>(json);
            }

            using (StreamReader reader = new StreamReader("stations.json"))
            {
                var json = reader.ReadToEnd();
                _stations = JsonConvert.DeserializeObject<List<Station>>(json);
            }

            using (StreamReader reader = new StreamReader("rooms.json"))
            {
                var json = reader.ReadToEnd();
                _rooms = JsonConvert.DeserializeObject<List<Room>>(json);
            }

            using (StreamReader reader = new StreamReader("offices.json"))
            {
                var json = reader.ReadToEnd();
                _offices = JsonConvert.DeserializeObject<List<Office>>(json);
            }
        }

        /// <summary>
        /// Zwraca listę pracowników wyszukanych po imieniu lub nazwisku. Jako parametr trzeba podać imię lub nazwisko.
        /// </summary>
        /// <param name="employeeInfo"></param>
        /// <returns></returns>
        public List<Employee> FindEmployees(string employeeInfo)
        {
            var employees = _employees
                .Where(e => (e.employeeName.ToLower().Contains(employeeInfo) ||
                            e.employeeSurname.ToLower().Contains(employeeInfo)) ||
                            e.employeeName.ToLower() + " " + e.employeeSurname.ToLower() == employeeInfo);

            return employees.ToList();
        }

        /// <summary>
        /// Zwraca biuro wyszukane po nazwie lub numerze. Jako parametr trzeba podać nazwę lub numer.
        /// </summary>
        /// <param name="employeeInfo"></param>
        /// <returns></returns>
        public Office FindOffice(string officeInfo)
        {
            int officeNumber = 0;
            var status = int.TryParse(officeInfo, out officeNumber);
            Office office;
            // Wyszukujemy po numerze
            if (status)
            {
                office = _offices.Find(o => o.officeNumber == officeNumber);
            }
            else
            {
                office = _offices.Find(o => o.officeName.ToLower().Contains(officeInfo));
            }

            return office;
        }

        /// <summary>
        /// Zwraca pokój wyszukany po nazwie lub numerze. Jako parametr trzeba podać nazwę lub numer.
        /// </summary>
        /// <param name="employeeInfo"></param>
        /// <returns></returns>
        public Room FindRoom(string roomInfo)
        {
            int roomNumber = 0;
            var status = int.TryParse(roomInfo, out roomNumber);
            Room room;
            // Wyszukujemy po numerze
            if (status)
            {
                room = _rooms.Find(r => r.roomNumber == roomNumber);
            }
            else
            {
                room = _rooms.Find(r => r.roomName.ToLower().Contains(roomInfo));
            }

            return room;
        }

        /// <summary>
        /// Zwraca informację o tym gdzie siedzi ten pracownik. Null oznacza, że nie znaleziono info dla tego pracownika. Należy przekazać w parametrze id pracownika.
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public string FindPlaceForEmployee(int employeeId)
        {
            var station = _stations.Find(s => s.employeeId == employeeId);
            if (station != null)
            {
                return $"Biurko: {station.stationName}";
            }

            var room = _rooms.Find(r => r.employeeId == employeeId);
            if (room != null)
            {
                return $"Pokój nr {room.roomNumber} - {room.roomName}";
            }

            var office = _offices.Find(o => o.employeeId == employeeId);
            if (office != null)
            {
                return $"Biuro nr {office.officeNumber} - {office.officeName}";
            }

            return null;
        }

        public Employee FindEmployeeForPlace(string placeId)
        {
            var employee = _employees.Find(e => e.placeId == placeId);
            return employee;
        }
    }
}
