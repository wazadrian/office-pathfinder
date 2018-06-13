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
    [Activity(Label = "StationsActivity")]
    public class StationsActivity : Activity
    {
        private List<Station> _foundStations;
        readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.listLayout);


            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            var stationResultListView = FindViewById<ListView>(Resource.Id.resultListView);
            
            
            _foundStations = _databaseConnection.GetAllStations();

            var stationAdapter = new StationItemAdapter(this, _foundStations);
            stationResultListView.Adapter = stationAdapter;
            stationResultListView.ItemClick += ResultListView_ItemClick;

            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };

        }

        private void ResultListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(StationDetailsActivity));
            nextActivity.PutExtra("id", _foundStations[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
    }
}