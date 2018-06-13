using System;
using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;
using MobileBackend.Models;
using PathFinder.Data;

namespace PathFinder
{
    [Activity(Label = "EmployeeDetailsActivity")]
    public class EmployeeDetailsActivity : Activity
    {
        readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.employeeDetailsLayout);
            var homeButton = FindViewById<Button>(Resource.Id.homeButton);

            var id = Intent.GetStringExtra("id" ?? "");

            var nameTextView = FindViewById<TextView>(Resource.Id.employeeNameTextView);
            var surnameTextView = FindViewById<TextView>(Resource.Id.employeeSurnameTextView);
            var positionTextView = FindViewById<TextView>(Resource.Id.employeePositionTextView);
            var placeTextView = FindViewById<TextView>(Resource.Id.employeePlaceTextView);

            if (id != "")
            {
                var employee = _databaseConnection.GetAllEmployees().Single(x => x.id.ToString() == id);
                nameTextView.Text = employee.employeeName;
                surnameTextView.Text = employee.employeeSurname;
                positionTextView.Text = employee.employeePosition;
                placeTextView.Text = employee.placeId;
            }
            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };
        }
    }
}