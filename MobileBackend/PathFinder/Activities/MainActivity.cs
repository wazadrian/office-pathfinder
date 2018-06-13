using Android.App;
using Android.Content;
using Android.OS;
using Android.Support.V7.App;
using Android.Widget;

namespace PathFinder
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true)]
    public class MainActivity : AppCompatActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);


            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.activity_main);

            var mainImageView = FindViewById<ImageView>(Resource.Id.mainImageView);
            mainImageView.SetImageResource(Resource.Drawable.ppg);

            var searchButton = FindViewById<Button>(Resource.Id.searchButton);
            var inputEditText = FindViewById<EditText>(Resource.Id.inputEditText);
            var employeesButton = FindViewById<Button>(Resource.Id.employeesButton);
            var roomsButton = FindViewById<Button>(Resource.Id.roomsButton);
            var officesButton = FindViewById<Button>(Resource.Id.officesButton);
            var stationsButton = FindViewById<Button>(Resource.Id.stationsButton);


            searchButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(SearchActivity));
                nextActivity.PutExtra("keyword", inputEditText.Text);
                StartActivity(nextActivity);
            };
            employeesButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(EmployeesActivity));
                StartActivity(nextActivity);
            };
            roomsButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(RoomsActivity));
                StartActivity(nextActivity);
            };
            officesButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(OfficesActivity));
                StartActivity(nextActivity);
            };
            stationsButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(StationsActivity));
                StartActivity(nextActivity);
            };
        }
    }
}