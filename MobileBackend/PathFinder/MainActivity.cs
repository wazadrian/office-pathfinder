using Android.App;
using Android.Widget;
using Android.OS;
using Android.Support.V7.App;
using Android.Views;
using System.Collections.Generic;
using MobileBackend.Models;
using PathFinder.Data;


namespace PathFinder
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true)]
    public class MainActivity : AppCompatActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            IDatabaseConnection databaseConnection = new MockDatabase();

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.activity_main);

            var imageView = FindViewById<ImageView>(Resource.Id.mainImageView);
            imageView.SetImageResource(Resource.Drawable.ppg);

            var buttonMap = FindViewById<Button>(Resource.Id.mapButton);
            var buttonSearch = FindViewById<Button>(Resource.Id.searchButton);
            var buttonExit = FindViewById<Button>(Resource.Id.exitButton);
            var inputText = FindViewById<EditText>(Resource.Id.inputText);



            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            //searchLayout
            var searchLayoutList = FindViewById<ListView>(Resource.Id.searchLayoutList);
            var searchLayoutTextBox = FindViewById<EditText>(Resource.Id.searchLayoutTextBox);
            var searchLayoutSearchButton = FindViewById<Button>(Resource.Id.searchLayoutSearchButton);
            // /searchLayout



            buttonSearch.Click += (e, o) =>
            {
                SetContentView(Resource.Layout.searchLayout);
            };

            /*homeButton.Click += (e, o) =>
            {
                SetContentView(Resource.Layout.activity_main);
            };*/



        }
    }
}

