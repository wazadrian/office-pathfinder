using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;

namespace PathFinder
{
    [Activity(Label = "EmployeeDetailsActivity")]
    public class EmployeeDetailsActivity : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.employeeDetailsLayout);
            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            
            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };
        }
    }
}