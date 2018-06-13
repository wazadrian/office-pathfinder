using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;
using PathFinder.Data;

namespace PathFinder
{
    [Activity(Label = "RoomDetailsActivity")]
    public class RoomDetailsActivity : Activity
    {
        private readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.roomDetailsLayout);
            var homeButton = FindViewById<Button>(Resource.Id.homeButton);

            var id = Intent.GetStringExtra("id" ?? "");

            var nameTextView = FindViewById<TextView>(Resource.Id.nameTextView);
            var numberTextView = FindViewById<TextView>(Resource.Id.numberTextView);
            var employeeTextView = FindViewById<TextView>(Resource.Id.employeeTextView);

            if (id != "")
            {
                var room = _databaseConnection.GetAllRooms().Single(x => x.id.ToString() == id);
                nameTextView.Text = room.roomName;
                numberTextView.Text = room.roomNumber.ToString();
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