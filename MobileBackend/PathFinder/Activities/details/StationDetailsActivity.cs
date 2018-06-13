using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;
using PathFinder.Data;

namespace PathFinder
{
    [Activity(Label = "StationDetailsActivity")]
    public class StationDetailsActivity : Activity
    {
        private readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.stationDetailsLayout);
            var homeButton = FindViewById<Button>(Resource.Id.homeButton);

            var id = Intent.GetStringExtra("id" ?? "");

            var nameTextView = FindViewById<TextView>(Resource.Id.nameTextView);
            var employeeTextView = FindViewById<TextView>(Resource.Id.employeeTextView);

            if (id != "")
            {
                var station = _databaseConnection.GetAllStations().Single(x => x.id.ToString() == id);
                nameTextView.Text = station.stationName;
                employeeTextView.Text = "TODO"; // TODO: change id to Name Surname
            }
            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };
        }
    }
}