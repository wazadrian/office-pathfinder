using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;
using PathFinder.Data;

namespace PathFinder
{
    [Activity(Label = "SearchActivity")]
    public class SearchActivity : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.searchLayout);

            IDatabaseConnection databaseConnection = new MockDatabase();

            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            var inputEditText = FindViewById<EditText>(Resource.Id.inputEditText);
            var searchButton = FindViewById<Button>(Resource.Id.searchButton);
            var resultListView = FindViewById<ListView>(Resource.Id.resultListView);

            var keyword = Intent.GetStringExtra("keyword" ?? "");
            inputEditText.Text = keyword;
            inputEditText.RequestFocus();

            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };
        }
    }
}