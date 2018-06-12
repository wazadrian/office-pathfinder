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

            var mapButton = FindViewById<Button>(Resource.Id.mapButton);
            var searchButton = FindViewById<Button>(Resource.Id.searchButton);
            var exitButton = FindViewById<Button>(Resource.Id.exitButton);
            var inputEditText = FindViewById<EditText>(Resource.Id.inputEditText);


            searchButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(SearchActivity));
                nextActivity.PutExtra("keyword", inputEditText.Text);
                StartActivity(nextActivity);
            };
        }
    }
}