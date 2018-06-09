using MobileBackend;
using MobileBackend.Data;
using MobileBackend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        SearchingEngine _searchingEngine;
        List<Employee> _employees;

        public Form1()
        {
            _searchingEngine = new SearchingEngine();
            InitializeComponent();
        }

        private void buttonEmployee_Click(object sender, EventArgs e)
        {
            listBoxEmployees.Items.Clear();
            _employees = _searchingEngine.FindEmployees(textBoxEmployee.Text);
            foreach (var emp in _employees)
            {
                listBoxEmployees.Items.Add($"{emp.employeeName} {emp.employeeSurname}");
            }
        }

        private void listBoxEmployees_MouseClick(object sender, MouseEventArgs e)
        {
            int id = listBoxEmployees.SelectedIndex;
            if (id != -1)
            {
                var emloyee = _employees[id];
                var message = _searchingEngine.FindPlaceForEmployee(emloyee.employeeId);
                MessageBox.Show(message);
            }
        }

        private void buttonOffice_Click(object sender, EventArgs e)
        {
            var office = _searchingEngine.FindOffice(textBoxOffice.Text);
            if (office != null)
            {
                var employee = _searchingEngine.FindEmployeeForPlace(office.officeId);
                if (employee != null)
                {
                    MessageBox.Show($"{office.officeName}, {employee.employeeName}");
                }
                else
                {
                    MessageBox.Show(office.officeName);
                }
            }
        }

        private void buttonRoom_Click(object sender, EventArgs e)
        {
            var room = _searchingEngine.FindRoom(textBoxRoom.Text);
            if (room != null)
            {
                var employee = _searchingEngine.FindEmployeeForPlace(room.roomId);
                if (employee != null)
                {
                    MessageBox.Show($"{room.roomName}, {employee.employeeName}");
                }
                else
                {
                    MessageBox.Show(room.roomName);
                }
            }
        }
    }
}
