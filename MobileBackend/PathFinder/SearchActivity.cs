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
    [Activity(Label = "SearchActivity")]
    public class SearchActivity : Activity
    {
        private List<Employee> _foundItems;
        readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.searchLayout);


            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            var inputEditText = FindViewById<EditText>(Resource.Id.inputEditText);
            var searchButton = FindViewById<Button>(Resource.Id.searchButton);
            var resultListView = FindViewById<ListView>(Resource.Id.resultListView);

            var keyword = Intent.GetStringExtra("keyword" ?? "");
            //inputEditText.Text = keyword;

            _foundItems = _databaseConnection.GetAllEmployees().Where(x => x.employeeName.Contains(keyword) || x.employeeSurname.Contains(keyword)).ToList();

            var adapter = new EmployeeItemAdapter(this, _foundItems);
            resultListView.Adapter = adapter;

            resultListView.ItemClick += ResultListView_ItemClick;

            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };

            /*searchButton.Click += (e, o) =>
            {
                keyword = inputEditText.Text;
                _foundItems = _databaseConnection.GetAllEmployees().Where(x => x.employeeName.Contains(keyword) || x.employeeSurname.Contains(keyword)).ToList();
            };*/
        }

        private void ResultListView_ItemClick(object sender, AdapterView.ItemClickEventArgs e)
        {
            var nextActivity = new Intent(this, typeof(EmployeeDetailsActivity));
            nextActivity.PutExtra("id", _foundItems[e.Position].id.ToString());
            StartActivity(nextActivity);
        }
    }
}