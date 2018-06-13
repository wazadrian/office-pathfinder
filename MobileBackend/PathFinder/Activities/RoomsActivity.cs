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
    [Activity(Label = "RoomsActivity")]
    public class RoomsActivity : Activity
    {
        private List<Room> _foundRooms;
        readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.listLayout);


            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            var roomResultListView = FindViewById<ListView>(Resource.Id.resultListView);
            
            _foundRooms = _databaseConnection.GetAllRooms();
            

            var roomAdapter = new RoomItemAdapter(this, _foundRooms);
            roomResultListView.Adapter = roomAdapter;
            roomResultListView.ItemClick += ResultListView_ItemClick;

            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };

        }

        private void ResultListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(RoomDetailsActivity));
            nextActivity.PutExtra("id", _foundRooms[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
    }
}