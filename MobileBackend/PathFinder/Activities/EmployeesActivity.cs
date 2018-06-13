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
    [Activity(Label = "EmployeesActivity")]
    public class EmployeesActivity : Activity
    {
        private List<Employee> _foundEmployees;
        readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.listLayout);


            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            var employeeResultListView = FindViewById<ListView>(Resource.Id.resultListView);
            

            _foundEmployees = _databaseConnection.GetAllEmployees();

            var employeeAdapter = new EmployeeItemAdapter(this, _foundEmployees);
            employeeResultListView.Adapter = employeeAdapter;
            employeeResultListView.ItemClick += ResultListView_ItemClick;

            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };

        }

        private void ResultListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(EmployeeDetailsActivity));
            nextActivity.PutExtra("id", _foundEmployees[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
    }
}