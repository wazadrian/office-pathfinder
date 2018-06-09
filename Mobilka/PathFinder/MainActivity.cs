using Android.App;
using Android.Widget;
using Android.OS;
using Android.Support.V7.App;

namespace PathFinder
{
    [Activity(Label = "PathFinder", Theme = "@style/AppTheme", MainLauncher = true)]
    public class MainActivity : AppCompatActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.mainView);
        }
    }
}

