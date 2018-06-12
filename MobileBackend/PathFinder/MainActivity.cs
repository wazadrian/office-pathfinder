using Android.App;
using Android.Widget;
using Android.OS;
using Android.Support.V7.App;
using Android.Views;
using System.Collections.Generic;


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

            var imageView = FindViewById<ImageView>(Resource.Id.mainImageView);
            var buttonMap = FindViewById<Button>(Resource.Id.mapButton);
            var buttonSearch = FindViewById<Button>(Resource.Id.searchButton);
            var buttonExit = FindViewById<Button>(Resource.Id.exitButton);
            var inputText = FindViewById<EditText>(Resource.Id.inputText);
            var outputListView = FindViewById<ListView>(Resource.Id.outputListView);

            //_searchingEngine = new SearchingEngine();
            //imageView.SetImageResource(Resource.Drawable.ppg);

            buttonSearch.Click += (e, o) =>
              {
                  string dataToSearch = inputText.Text;
                  
                  //listBoxEmployees.Items.Clear();
                 // _employees = _searchingEngine.FindEmployees("Sa");
                //  foreach (var emp in _employees)
                 // {
                      //outputListView.SetAdapter(_employees);// Item .Add($"{emp.employeeName} {emp.employeeSurname}");
                //  }
              };
        }
    }
}

