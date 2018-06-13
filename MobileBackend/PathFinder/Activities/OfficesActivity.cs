using System.Collections.Generic;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;
using MobileBackend.Models;
using PathFinder.Adapters;
using PathFinder.Data;

namespace PathFinder
{
    [Activity(Label = "OfficesActivity")]
    public class OfficesActivity : Activity
    {
        private readonly IDatabaseConnection _databaseConnection = Database.Connection;
        private List<Office> _foundOffices;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.listLayout);


            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            var officeResultListView = FindViewById<ListView>(Resource.Id.resultListView);


            _foundOffices = _databaseConnection.GetAllOffices();


            var officeAdapter = new OfficeItemAdapter(this, _foundOffices);
            officeResultListView.Adapter = officeAdapter;
            officeResultListView.ItemClick += ResultListView_ItemClick;


            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };
        }

        private void ResultListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(OfficeDetailsActivity));
            nextActivity.PutExtra("id", _foundOffices[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
    }
}