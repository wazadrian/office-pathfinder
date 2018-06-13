using System.Collections.Generic;
using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;
using MobileBackend.Models;
using PathFinder.Adapters;
using PathFinder.Data;

namespace PathFinder
{
    [Activity(Label = "SearchActivity")]
    public class SearchActivity : Activity
    {
        private List<Employee> _foundEmployees;
        private List<Station> _foundStations;
        private List<Office> _foundOffices;
        private List<Room> _foundRooms;
        readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.searchLayout);


            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            var inputEditText = FindViewById<EditText>(Resource.Id.inputEditText);
            var searchButton = FindViewById<Button>(Resource.Id.searchButton);
            var employeeResultListView = FindViewById<ListView>(Resource.Id.employeeResultListView);
            var stationResultListView = FindViewById<ListView>(Resource.Id.stationResultListView);
            var officeResultListView = FindViewById<ListView>(Resource.Id.officeResultListView);
            var roomResultListView = FindViewById<ListView>(Resource.Id.roomResultListView);

            var keyword = Intent.GetStringExtra("keyword" ?? "");
            //inputEditText.Text = keyword;

            _foundEmployees = _databaseConnection.GetAllEmployees().Where(x => x.employeeName.Contains(keyword) || x.employeeSurname.Contains(keyword)).ToList();
            _foundStations = _databaseConnection.GetAllStations().Where(x => x.stationName.Contains(keyword)).ToList();
            _foundOffices = _databaseConnection.GetAllOffices().Where(x => x.officeName.Contains(keyword) || x.officeNumber.ToString().Contains(keyword)).ToList();
            _foundRooms = _databaseConnection.GetAllRooms().Where(x => x.roomName.Contains(keyword) || x.roomNumber.ToString().Contains(keyword)).ToList();

            var employeeAdapter = new EmployeeItemAdapter(this, _foundEmployees);
            employeeResultListView.Adapter = employeeAdapter;
            employeeResultListView.ItemClick += EmployeeListView_ItemClick;

            var stationAdapter = new StationItemAdapter(this, _foundStations);
            stationResultListView.Adapter = stationAdapter;
            stationResultListView.ItemClick += StationListView_ItemClick;

            var officeAdapter = new OfficeItemAdapter(this, _foundOffices);
            officeResultListView.Adapter = officeAdapter;
            officeResultListView.ItemClick += OfficeListView_ItemClick;

            var roomAdapter = new RoomItemAdapter(this, _foundRooms);
            roomResultListView.Adapter = roomAdapter;
            roomResultListView.ItemClick += RoomListView_ItemClick;

            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };

            /*searchButton.Click += (e, o) =>
            {
                keyword = inputEditText.Text;
                _foundEmployees = _databaseConnection.GetAllEmployees().Where(x => x.employeeName.Contains(keyword) || x.employeeSurname.Contains(keyword)).ToList();
            };*/
        }

        private void EmployeeListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(EmployeeDetailsActivity));
            nextActivity.PutExtra("id", _foundEmployees[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
        private void StationListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(StationDetailsActivity));
            nextActivity.PutExtra("id", _foundStations[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
        private void RoomListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(RoomDetailsActivity));
            nextActivity.PutExtra("id", _foundEmployees[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
        private void OfficeListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(OfficeDetailsActivity));
            nextActivity.PutExtra("id", _foundOffices[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
    }
}