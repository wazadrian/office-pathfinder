using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Widget;
using PathFinder.Data;

namespace PathFinder
{
    [Activity(Label = "OfficeDetailsActivity")]
    public class OfficeDetailsActivity : Activity
    {
        private readonly IDatabaseConnection _databaseConnection = Database.Connection;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.officeDetailsLayout);
            var homeButton = FindViewById<Button>(Resource.Id.homeButton);

            var id = Intent.GetStringExtra("id" ?? "");

            var nameTextView = FindViewById<TextView>(Resource.Id.nameTextView);
            var numberTextView = FindViewById<TextView>(Resource.Id.numberTextView);
            var employeeTextView = FindViewById<TextView>(Resource.Id.employeeTextView);

            if (id != "")
            {
                var office = _databaseConnection.GetAllOffices().Single(x => x.id.ToString() == id);
                nameTextView.Text = office.officeName;
                numberTextView.Text = office.officeNumber.ToString();
                employeeTextView.Text = "Lucas Phelps"; // TODO: change id to Name Surname
            }
            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };
        }
    }
}